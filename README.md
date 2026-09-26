# Telugu AI Studio

A Telugu-first cinematic video creation studio. The current release is a polished browser MVP with an explicit development provider; it does not claim that mock story or image requests are live AI calls.

## What works now

- Six creation modes and Telugu/English prompt input
- Editable Telugu story and reorderable scene breakdown
- Four generated cinematic demo image candidates
- Image/audio upload validation and microphone recording
- Telugu system-voice preview with speed and voice controls
- Lightweight timeline, subtitle controls, aspect ratios, and project history
- Real client-side animated WebM rendering and video/script/subtitle/audio downloads
- Responsive desktop and mobile workspace

## Architecture

The client is React 19, TypeScript, Vite, Tailwind CSS, and Lucide icons. Provider contracts live in `src/studio/providers.ts`. The development provider returns clearly labelled mock story/image data. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the proposed PostgreSQL, Redis worker, object storage, FFmpeg, and SSE production design.

## Setup

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Using the MVP

1. Select a creation mode and enter a Telugu or English concept.
2. Choose dialect, duration, format, and optional image/audio input.
3. Generate and edit the development story draft.
4. Pick one of four visual directions.
5. Preview system Telugu speech, record narration, or upload authorized audio.
6. Adjust the editor and render. Keep the tab active while browser rendering runs.
7. Download the WebM video, Telugu script, SRT subtitles, and optional audio.

Chrome or Edge provides the most reliable `MediaRecorder`, canvas capture, and microphone support.

## Environment

Copy `.env.example` when adding the backend. Values prefixed with `VITE_` are public browser configuration. API keys, database credentials, session secrets, and storage credentials must be server-only.

## Production implementation phases

1. Add the API, authentication, PostgreSQL schema, signed uploads, and project authorization.
2. Add Redis jobs, idempotency, retries, cancellation, usage tracking, and SSE progress.
3. Implement live LLM, image, Telugu TTS, speech-to-text, and video provider adapters.
4. Add FFmpeg workers for H.264 MP4, transitions, subtitle burning, audio ducking, and 720p/1080p outputs.
5. Add integration tests for validation, ownership, provider failures, jobs, uploads, scenes, and downloads.

## FFmpeg production requirements

Install a recent FFmpeg build on render workers and verify H.264/AAC encoders. Workers should download project-scoped assets into an isolated job directory, compose deterministically, upload the result, and remove temporary files after success or failure.

## Troubleshooting

- No Telugu voice: install a Telugu system voice or configure a production TTS provider.
- Microphone denied: allow microphone access for the site or upload audio.
- Render fails: use current Chrome/Edge and keep the tab active.
- GitHub Pages: only the browser MVP can run there. Server AI, databases, queues, and FFmpeg require a separate backend deployment.

## Demo assets

The four project images were generated with the built-in image generation tool as fictional, culturally respectful cinematic Telugu story scenes with no text, logos, or watermarks.
