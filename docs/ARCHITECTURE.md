# Telugu AI Studio architecture

## Current runnable layer

The repository currently ships a Vite/React browser MVP. It uses development provider adapters for story and image results, while uploads, microphone capture, system Telugu speech preview, project history, scene editing, subtitles, canvas animation, WebM rendering, and downloads run for real in the browser.

## Production topology

```text
React web client
  | REST commands + SSE job progress
API service (authentication, validation, authorization, rate limits)
  | creates jobs
PostgreSQL <-> Redis queue
                   |
       AI worker + FFmpeg render worker
                   |
             Object storage
```

SSE is the first status transport because generation is server-to-client, reconnectable, and operationally simpler than WebSockets. Polling remains the fallback.

## Service boundaries

- `LLMProvider`: improve prompt, produce validated structured Telugu story data.
- `ImageGenerationProvider`: produce four candidates and asset metadata.
- `VideoGenerationProvider`: generate motion clips independently of final composition.
- `TextToSpeechProvider`: create authorized Telugu narration.
- `SpeechToTextProvider`: transcribe uploaded speech for subtitle timing.
- `StorageProvider`: signed uploads and project-scoped downloads.
- Render worker: FFmpeg transitions, aspect conversion, audio ducking, subtitles, and H.264 MP4 output.

Provider credentials stay in server/worker environments. The browser receives short-lived signed asset URLs only.

## Data model

Core tables: `User`, `Project`, `Story`, `Character`, `Scene`, `Asset`, `Audio`, `Subtitle`, `GenerationJob`, and `RenderJob`. Assets store provider/model/prompt/status/storage key/timestamps and project/scene ownership. Large binaries belong in object storage, never PostgreSQL.

## Job rules

Every generation command uses a project-scoped idempotency key. Jobs have explicit queued/running/completed/failed/cancelled states, bounded retries, timeouts, cost estimates, and provider request IDs. Refreshing the client only reloads status; it never starts generation.

## Safety

Validate MIME type and file signatures, scan uploads, constrain size/duration, moderate prompts and outputs, label AI-assisted media, and require authorization before every asset download. Photo-inspired stories are framed as fiction, and voice cloning is disabled unless a future consent workflow is implemented.
