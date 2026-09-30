import {
  AudioLines, Check, ChevronRight, CircleHelp, Clapperboard, Copy, Download,
  Film, FolderClock, GripVertical, Image as ImageIcon, ImagePlus, Languages,
  LayoutGrid, LoaderCircle, Menu, Mic, MoreHorizontal, Music2, Play, Plus,
  RefreshCcw, Settings, Sparkles, Square, Subtitles, Trash2, Upload,
  Video, WandSparkles, X,
} from 'lucide-react';
import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { CreationMode, demoImages, providers, Scene, StoryResult } from './studio/providers';

type Stage = 'idea' | 'story' | 'images' | 'voice' | 'editor' | 'export';
type Project = { id: string; title: string; mode: string; status: 'Draft' | 'Completed'; date: string; duration: number; image: string };

const modes: { id: CreationMode; title: string; sub: string; icon: typeof Video; tone: string }[] = [
  { id: 'prompt', title: 'Prompt to Video', sub: 'మీ ఆలోచన నుంచి పూర్తి వీడియో', icon: WandSparkles, tone: 'coral' },
  { id: 'image-story', title: 'Image to Story', sub: 'ఫోటోతో కొత్త కల్పిత కథ', icon: ImagePlus, tone: 'cyan' },
  { id: 'image-audio', title: 'Image + Audio', sub: 'మీ వాయిస్‌తో కదిలే దృశ్యం', icon: AudioLines, tone: 'lime' },
  { id: 'image-video', title: 'Image to Video', sub: 'మీ చిత్రాన్ని సినిమాటిక్ వీడియోగా మార్చండి', icon: ImageIcon, tone: 'amber' },
  { id: 'video-story', title: 'Video to Story', sub: 'వీడియో నుంచి కొత్త తెలుగు కథ', icon: Video, tone: 'cyan' },
  { id: 'ai-image', title: 'AI Image to Video', sub: 'నాలుగు చిత్రాలు, ఒక సినిమా', icon: ImageIcon, tone: 'violet' },
  { id: 'funny', title: 'Funny Telugu Video', sub: 'సహజమైన ఒరిజినల్ కామెడీ', icon: Sparkles, tone: 'amber' },
  { id: 'story', title: 'Story Generator', sub: 'కథ, పాత్రలు, సన్నివేశాలు', icon: Clapperboard, tone: 'rose' },
];
const stages: Stage[] = ['idea', 'story', 'images', 'voice', 'editor', 'export'];
const sample = 'ఒక గ్రామంలో ఇద్దరు స్నేహితులు టీ షాప్ దగ్గర ఫన్నీగా మాట్లాడుకుంటున్నారు. చివరికి టీ బిల్లు విషయంలో ఊహించని ట్విస్ట్ వస్తుంది.';
const progress = ['మీ ఆలోచనను అర్థం చేసుకుంటున్నాం...', 'సహజమైన తెలుగు కథ రాస్తున్నాం...', 'పాత్రలను రూపొందిస్తున్నాం...', 'సన్నివేశాలను విభజిస్తున్నాం...', 'స్టోరీబోర్డ్ సిద్ధం చేస్తున్నాం...'];
const initialProjects: Project[] = [
  { id: 'demo1', title: 'టీ షాప్ ట్విస్ట్', mode: 'Funny Telugu Video', status: 'Completed', date: 'Demo project', duration: 15, image: demoImages[0] },
  { id: 'demo2', title: 'పండుగ వెలుగులు', mode: 'Prompt to Video', status: 'Draft', date: 'Demo project', duration: 20, image: demoImages[1] },
];

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const loadSpeechVoices = async () => { const current = speechSynthesis.getVoices(); if (current.length) return current; await new Promise<void>((resolve) => { const timeout = window.setTimeout(resolve, 1500); speechSynthesis.addEventListener('voiceschanged', () => { window.clearTimeout(timeout); resolve(); }, { once: true }); }); return speechSynthesis.getVoices(); };
const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; });
const downloadText = (text: string, filename: string) => { const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); };
const srt = (scenes: Scene[]) => { let time = 0; const stamp = (s: number) => new Date(s * 1000).toISOString().slice(11, 23).replace('.', ','); return scenes.map((scene, i) => { const start = time; time += scene.duration; return `${i + 1}\n${stamp(start)} --> ${stamp(time)}\n${scene.dialogue}\n`; }).join('\n'); };
const wrap = (ctx: CanvasRenderingContext2D, text: string, width: number) => { const lines: string[] = []; let line = ''; text.split(/\s+/).forEach((word) => { const next = line ? `${line} ${word}` : word; if (line && ctx.measureText(next).width > width) { lines.push(line); line = word; } else line = next; }); if (line) lines.push(line); return lines.slice(0, 3); };

export default function App() {
  const [view, setView] = useState<'create' | 'projects'>('create');
  const [navOpen, setNavOpen] = useState(false);
  const [mode, setMode] = useState<CreationMode>('prompt');
  const [stage, setStage] = useState<Stage>('idea');
  const [prompt, setPrompt] = useState(sample);
  const [dialect, setDialect] = useState('సహజ సంభాషణ');
  const [format, setFormat] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [duration, setDuration] = useState('30 sec');
  const [story, setStory] = useState<StoryResult | null>(null);
  const [choice, setChoice] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [uploadedVideoPoster, setUploadedVideoPoster] = useState<string | null>(null);
  const [videoName, setVideoName] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioName, setAudioName] = useState('');
  const [recording, setRecording] = useState(false);
  const [voice, setVoice] = useState('Female');
  const [voiceStyle, setVoiceStyle] = useState('Storytelling');
  const [speed, setSpeed] = useState(.95);
  const [subtitle, setSubtitle] = useState('None');
  const [systemVoicePreviewed, setSystemVoicePreviewed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('మీ ఆలోచన సిద్ధంగా ఉంది.');
  const [projects, setProjects] = useState<Project[]>(() => { try { return JSON.parse(localStorage.getItem('telugu-studio-projects') || 'null') || initialProjects; } catch { return initialProjects; } });
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const dragged = useRef<number | null>(null);
  const activeMode = modes.find((item) => item.id === mode)!;
  const usesUploadedImageForVideo = ['image-video', 'ai-image', 'funny'].includes(mode);
  const visibleStages = usesUploadedImageForVideo ? stages.filter((item) => item !== 'images') : stages;
  const script = story?.scenes.map((scene) => scene.dialogue).join(' ') || '';
  const totalDuration = useMemo(() => story?.scenes.reduce((sum, scene) => sum + scene.duration, 0) || 0, [story]);

  useEffect(() => localStorage.setItem('telugu-studio-projects', JSON.stringify(projects)), [projects]);
  useEffect(() => () => { if (videoUrl) URL.revokeObjectURL(videoUrl); }, [videoUrl]);

  const chooseMode = (id: CreationMode) => { setMode(id); setStage('idea'); setSystemVoicePreviewed(false); document.querySelector('#creator')?.scrollIntoView({ behavior: 'smooth' }); };
  const generate = async () => {
    if (prompt.trim().length < 12) return setStatus('కథ ఆలోచనను కొంచెం వివరంగా రాయండి.');
    if (['image-story', 'image-audio', 'image-video', 'ai-image', 'funny'].includes(mode) && !uploadedImage) return setStatus('ముందుగా ఒక చిత్రాన్ని అప్‌లోడ్ చేయండి.');
    if (mode === 'video-story' && !uploadedVideo) return setStatus('ముందుగా ఒక వీడియోను అప్‌లోడ్ చేయండి.');
    setIsGenerating(true);
    setSystemVoicePreviewed(false);
    try {
      const resultPromise = providers.llm.generateStory(prompt, mode, dialect);
      for (let i = 0; i < progress.length; i += 1) { setProgressIndex(i); setStatus(progress[i]); await wait(330); }
      const result = await resultPromise;
      if (uploadedImage && usesUploadedImageForVideo) result.scenes = result.scenes.map((scene) => ({ ...scene, image: uploadedImage }));
      else if (uploadedImage) result.scenes[0].image = uploadedImage;
      if (uploadedVideoPoster && mode === 'video-story') result.scenes = result.scenes.map((scene) => ({ ...scene, image: uploadedVideoPoster }));
      setStory(result); setStage('story'); setStatus('కథ సిద్ధమైంది. ప్రతి సన్నివేశాన్ని మార్చుకోవచ్చు.');
      setProjects((items) => [{ id: crypto.randomUUID(), title: result.title, mode: activeMode.title, status: 'Draft', date: new Date().toLocaleDateString('en-IN'), duration: result.scenes.reduce((a, b) => a + b.duration, 0), image: result.scenes[0].image }, ...items.filter((item) => !item.id.startsWith('demo'))]);
    } catch { setStatus('కథ రూపొందించలేకపోయాం. మళ్లీ ప్రయత్నించండి.'); } finally { setIsGenerating(false); }
  };
  const updateScene = (id: string, field: keyof Scene, value: string | number) => { if (field === 'dialogue') setSystemVoicePreviewed(false); setStory((valueNow) => valueNow ? { ...valueNow, scenes: valueNow.scenes.map((scene) => scene.id === id ? { ...scene, [field]: value } : scene) } : valueNow); };
  const drop = (event: DragEvent, index: number) => { event.preventDefault(); if (!story || dragged.current === null) return; const list = [...story.scenes]; const [item] = list.splice(dragged.current, 1); list.splice(index, 0, item); setStory({ ...story, scenes: list }); dragged.current = null; };
  const imageUpload = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) return setStatus('10 MB లోపు JPG, PNG లేదా WEBP చిత్రాన్ని ఎంచుకోండి.'); if (uploadedImage) URL.revokeObjectURL(uploadedImage); setUploadedImage(URL.createObjectURL(file)); setStatus(`${file.name} సిద్ధంగా ఉంది. రూపొందే కథ కల్పితం.`); };
  const videoUpload = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; if (!['video/mp4', 'video/webm', 'video/quicktime'].includes(file.type) || file.size > 100 * 1024 * 1024) return setStatus('100 MB లోపు MP4, WebM లేదా MOV వీడియోను ఎంచుకోండి.'); if (uploadedVideo) URL.revokeObjectURL(uploadedVideo); const url = URL.createObjectURL(file); setUploadedVideo(url); setUploadedVideoPoster(null); setVideoName(file.name); const source = document.createElement('video'); source.muted = true; source.preload = 'metadata'; source.src = url; source.onloadedmetadata = () => { source.currentTime = Math.min(.2, source.duration || .2); }; source.onseeked = () => { const canvas = document.createElement('canvas'); canvas.width = source.videoWidth || 1280; canvas.height = source.videoHeight || 720; canvas.getContext('2d')?.drawImage(source, 0, 0, canvas.width, canvas.height); setUploadedVideoPoster(canvas.toDataURL('image/jpeg', .88)); }; setStatus(`${file.name} సిద్ధంగా ఉంది. వీడియో ఆధారంగా కల్పిత కథ రూపొందుతుంది.`); };
  const audioUpload = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file || !file.type.startsWith('audio/')) return setStatus('చెల్లుబాటు అయ్యే ఆడియో ఫైల్‌ను ఎంచుకోండి.'); setAudio(file); setAudioName(file.name); setStatus('మీ ఒరిజినల్ ఆడియో సిద్ధంగా ఉంది.'); };
  const startRecording = async () => { try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); chunks.current = []; const rec = new MediaRecorder(stream); recorder.current = rec; rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data); rec.onstop = () => { setAudio(new Blob(chunks.current, { type: 'audio/webm' })); setAudioName('Recorded Telugu narration.webm'); setRecording(false); stream.getTracks().forEach((track) => track.stop()); }; rec.start(); setRecording(true); setStatus('రికార్డింగ్ జరుగుతోంది...'); } catch { setStatus('మైక్రోఫోన్ అనుమతి లభించలేదు.'); } };
  const speak = async () => { if (!story || !('speechSynthesis' in window)) { setStatus('ఈ బ్రౌజర్‌లో సిస్టమ్ వాయిస్ అందుబాటులో లేదు.'); return; } setSystemVoicePreviewed(true); setStatus('Telugu system voice సిద్ధం చేస్తున్నాం...'); speechSynthesis.cancel(); const voices = await loadSpeechVoices(); const teluguVoice = voices.find((item) => item.lang.toLowerCase() === 'te-in') ?? voices.find((item) => item.lang.toLowerCase().startsWith('te')); if (!teluguVoice) { setStatus('Telugu system voice ఈ deviceలో లేదు. Editor unlock అయింది; voice కోసం Telugu audio record/upload చేయండి.'); return; } const utterance = new SpeechSynthesisUtterance(script); utterance.lang = teluguVoice.lang; utterance.voice = teluguVoice; utterance.rate = speed; utterance.pitch = voice === 'Female' ? 1.06 : .94; utterance.onstart = () => setStatus(`Telugu voice preview: ${teluguVoice.name}`); utterance.onerror = () => setStatus('Telugu system voice ప్లే కాలేదు. Editor unlock అయింది; audio record/upload చేయండి.'); speechSynthesis.speak(utterance); };

  const render = async () => {
    if (!story) return;
    if (!audio) { setStatus('Downloaded videoలో voice కోసం Voice stepలో audio record లేదా upload చేయండి.'); return; }
    setIsRendering(true);
    setRenderProgress(1);
    setStatus('వీడియో మరియు ఆడియో రెండర్ అవుతున్నాయి...');
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl('');
    try {
      const dimensions = format === '9:16' ? [720, 1280] : format === '1:1' ? [720, 720] : [1280, 720];
      const canvas = document.createElement('canvas');
      [canvas.width, canvas.height] = dimensions;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas is unavailable');
      const images = await Promise.all(story.scenes.map((scene) => loadImage(scene.image)));
      const drawFrame = (amount: number) => {
        const raw = amount * story.scenes.length;
        const index = Math.min(Math.floor(raw), story.scenes.length - 1);
        const local = Math.min(raw - index, 1);
        const image = images[index];
        const scene = story.scenes[index];
        const scale = Math.max(canvas.width / image.width, canvas.height / image.height) * (1.03 + local * .07);
        const width = image.width * scale;
        const height = image.height * scale;
        const direction = index % 2 === 0 ? -1 : 1;
        const x = (canvas.width - width) / 2 + direction * (local - .5) * canvas.width * .06;
        const y = (canvas.height - height) / 2 + Math.sin(local * Math.PI) * canvas.height * .018;
        ctx.fillStyle = '#080a08';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y, width, height);
        const shade = ctx.createLinearGradient(0, canvas.height * .5, 0, canvas.height);
        shade.addColorStop(0, 'transparent');
        shade.addColorStop(1, 'rgba(0,0,0,.88)');
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (subtitle !== 'None') {
          ctx.textAlign = 'center';
          ctx.font = `700 ${Math.max(28, canvas.width * .035)}px Inter, Nirmala UI, sans-serif`;
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 7;
          wrap(ctx, scene.dialogue, canvas.width * .82).forEach((line, lineIndex) => {
            const textY = canvas.height * .82 + lineIndex * 44;
            ctx.strokeText(line, canvas.width / 2, textY);
            ctx.fillText(line, canvas.width / 2, textY);
          });
        }
      };

      drawFrame(0);
      const canvasStream = canvas.captureStream(30);
      const output = new MediaStream(canvasStream.getVideoTracks());
      const audioUrl = URL.createObjectURL(audio);
      const audioElement = new Audio(audioUrl);
      audioElement.preload = 'auto';
      await new Promise<void>((resolve, reject) => { const timeout = window.setTimeout(() => reject(new Error('Audio loading timed out')), 5000); audioElement.oncanplay = () => { window.clearTimeout(timeout); resolve(); }; audioElement.onerror = () => { window.clearTimeout(timeout); reject(new Error('Audio could not be loaded')); }; audioElement.load(); });
      const audioContext = new AudioContext();
      await audioContext.resume();
      const source = audioContext.createMediaElementSource(audioElement);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);
      source.connect(audioContext.destination);
      destination.stream.getAudioTracks().forEach((track) => output.addTrack(track));
      const mime = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((type) => MediaRecorder.isTypeSupported(type)) || '';
      const media = new MediaRecorder(output, mime ? { mimeType: mime, videoBitsPerSecond: 4_000_000, audioBitsPerSecond: 128_000 } : undefined);
      const pieces: Blob[] = [];
      media.ondataavailable = (event) => { if (event.data.size) pieces.push(event.data); };
      const done = new Promise<void>((resolve, reject) => { media.onstop = () => resolve(); media.onerror = () => reject(new Error('Media recorder failed')); });
      const length = Math.max(3, Math.min(totalDuration, 18));
      const startedAt = performance.now();
      media.start(500);
      await audioElement.play();
      await new Promise<void>((resolve) => {
        const draw = () => {
          const elapsed = (performance.now() - startedAt) / 1000;
          const amount = Math.min(elapsed / length, 1);
          drawFrame(amount);
          setRenderProgress(Math.round(amount * 100));
          if (amount < 1) requestAnimationFrame(draw);
          else { media.requestData(); window.setTimeout(() => { media.stop(); resolve(); }, 150); }
        };
        requestAnimationFrame(draw);
      });
      await done;
      audioElement.pause();
      canvasStream.getTracks().forEach((track) => track.stop());
      output.getTracks().forEach((track) => track.stop());
      await audioContext.close();
      URL.revokeObjectURL(audioUrl);
      const blob = new Blob(pieces, { type: mime || 'video/webm' });
      if (blob.size < 10_000) throw new Error('Rendered video is empty');
      const outputUrl = URL.createObjectURL(blob);
      await new Promise<void>((resolve, reject) => { const test = document.createElement('video'); const timeout = window.setTimeout(() => reject(new Error('Video validation timed out')), 5000); test.onloadeddata = () => { window.clearTimeout(timeout); test.src = ''; resolve(); }; test.onerror = () => { window.clearTimeout(timeout); reject(new Error('Rendered video is not playable')); }; test.src = outputUrl; test.load(); });
      setVideoUrl(outputUrl);
      setStage('export');
      setStatus('తెలుగు ఆడియోతో వీడియో సిద్ధమైంది!');
      setProjects((items) => items.map((item, index) => index === 0 ? { ...item, status: 'Completed' } : item));
    } catch (error) { setStatus(error instanceof Error ? `Render failed: ${error.message}. Chrome లేదా Edgeలో మళ్లీ ప్రయత్నించండి.` : 'Render failed. Chrome లేదా Edgeలో మళ్లీ ప్రయత్నించండి.'); } finally { setIsRendering(false); }
  };

  return <div className="studio-app">
    <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
      <button className="nav-close icon" onClick={() => setNavOpen(false)} aria-label="Close"><X size={19} /></button>
      <button className="brand" onClick={() => { setView('create'); setStage('idea'); }}><span><Play size={17} fill="currentColor" /></span><b>Telugu AI<small>STUDIO</small></b></button>
      <nav><button className={view === 'create' ? 'active' : ''} onClick={() => setView('create')}><Plus /> Create</button><button className={view === 'projects' ? 'active' : ''} onClick={() => setView('projects')}><FolderClock /> My Creations <i>{projects.length}</i></button><button onClick={() => setStatus('Cloud assets arrive with the Phase 3 backend.')}><LayoutGrid /> Assets</button></nav>
      <div className="side-space" /><div className="demo-box"><span className="dot" /><b>Development provider</b><p>Story and image results are demo data. Browser rendering is real.</p></div>
      <nav><button><Settings /> Settings</button><button><CircleHelp /> Help & docs</button></nav><div className="profile"><span>P</span><b>Pragathi<small>Creator workspace</small></b><MoreHorizontal /></div>
    </aside>
    <main>
      <header className="topbar"><button className="mobile-menu icon" onClick={() => setNavOpen(true)}><Menu /></button><div>Studio <ChevronRight /> <b>{view === 'projects' ? 'My Creations' : activeMode.title}</b></div><aside><button><Languages /> తెలుగు</button><span><Sparkles /> Demo mode</span></aside></header>
      {view === 'projects' ? <Projects projects={projects} setProjects={setProjects} onCreate={() => setView('create')} /> : <>
        <section className="hero"><img src="./studio/tea-stall.png" alt="Two friends laughing at a village tea stall" /><div className="hero-overlay" /><div className="hero-copy"><em>TELUGU-FIRST AI VIDEO STUDIO</em><h1>మీ ఊహలకు<br /><span>ప్రాణం పోయండి.</span></h1><p>తెలుగులో కథ చెప్పండి. AI దాన్ని సినిమాటిక్ వీడియోగా మార్చుతుంది.</p><div><button className="primary large" onClick={() => document.querySelector('#creator')?.scrollIntoView({ behavior: 'smooth' })}><Sparkles /> వీడియో సృష్టించండి</button><button className="ghost large" onClick={() => setPreview(demoImages[0])}><Play fill="currentColor" /> డెమో చూడండి</button></div></div><div className="hero-stats"><span><b>8</b> creation modes</span><span><b>4</b> visual directions</span><span><b>100%</b> Telugu-ready</span></div></section>
        <section className="content modes"><div className="section-title"><div><em>START CREATING</em><h2>మీరు ఏం సృష్టించాలనుకుంటున్నారు?</h2></div><p>Choose a workflow. Edit every scene before rendering.</p></div><div className="mode-grid">{modes.map((item) => { const Icon = item.icon; return <button className={`${item.tone} ${mode === item.id ? 'selected' : ''}`} onClick={() => chooseMode(item.id)} key={item.id}><i><Icon /></i><span><b>{item.title}</b><small>{item.sub}</small></span><ChevronRight /></button>; })}</div></section>
        <section className="creator" id="creator"><div className="creator-head"><div><em>CREATE WORKFLOW</em><h2>{activeMode.title}</h2></div><div className="steps">{visibleStages.map((item, index) => <button className={stage === item ? 'active' : ''} disabled={!story && index > 0} onClick={() => setStage(item)} key={item}><i>{index + 1}</i>{item}</button>)}</div></div>
          <div className="workspace">
            {stage === 'idea' && <Idea mode={mode} prompt={prompt} setPrompt={setPrompt} dialect={dialect} setDialect={setDialect} duration={duration} setDuration={setDuration} format={format} setFormat={setFormat} uploadedImage={uploadedImage} imageUpload={imageUpload} uploadedVideo={uploadedVideo} videoName={videoName} videoUpload={videoUpload} audioName={audioName} audioUpload={audioUpload} status={status} generating={isGenerating} progressIndex={progressIndex} generate={generate} />}
            {stage === 'story' && story && <Story story={story} setStory={setStory} updateScene={updateScene} dragged={dragged} drop={drop} regenerate={generate} next={() => setStage(usesUploadedImageForVideo ? 'voice' : 'images')} nextLabel={usesUploadedImageForVideo ? 'Continue with my image' : 'Continue to images'} />}
            {stage === 'images' && story && <Images choice={choice} setChoice={setChoice} setPreview={setPreview} setStatus={setStatus} back={() => setStage('story')} next={() => { setStory({ ...story, scenes: story.scenes.map((scene, index) => ({ ...scene, image: demoImages[(choice + index) % 4] })) }); setStage('voice'); }} />}
            {stage === 'voice' && story && <Voice story={story} updateScene={updateScene} speak={speak} voice={voice} setVoice={setVoice} voiceStyle={voiceStyle} setVoiceStyle={setVoiceStyle} speed={speed} setSpeed={setSpeed} recording={recording} startRecording={startRecording} stop={() => recorder.current?.stop()} audio={audio} audioName={audioName} audioUpload={audioUpload} systemVoicePreviewed={systemVoicePreviewed} next={() => setStage('editor')} />}
            {stage === 'editor' && story && <Editor story={story} format={format} subtitle={subtitle} setSubtitle={setSubtitle} speak={speak} status={status} hasAudio={Boolean(audio)} usesSystemVoice={systemVoicePreviewed && !audio} rendering={isRendering} renderProgress={renderProgress} render={render} />}
            {stage === 'export' && story && <Export story={story} videoUrl={videoUrl} audio={audio} audioName={audioName} script={script} total={totalDuration} format={format} reset={() => { setStory(null); setStage('idea'); setVideoUrl(''); }} />}
          </div>
        </section>
        <section className="how"><em>HOW IT WORKS</em><h2>ఆలోచన నుంచి వీడియో వరకు</h2><div>{[['01', 'Tell your story', 'తెలుగులో లేదా Englishలో మీ ఆలోచన రాయండి.'], ['02', 'Shape every scene', 'కథ, చిత్రాలు, వాయిస్‌ని మార్చండి.'], ['03', 'Render & download', 'సబ్‌టైటిల్స్‌తో వీడియోను డౌన్‌లోడ్ చేయండి.']].map((item) => <article key={item[0]}><i>{item[0]}</i><b>{item[1]}</b><p>{item[2]}</p></article>)}</div></section>
      </>}
    </main>
    {preview && <div className="modal"><button className="icon" onClick={() => setPreview(null)}><X /></button><img src={preview} alt="Demo cinematic frame" /><div><em>DEMO FRAME</em><b>Made for Telugu stories</b><p>Generated demonstration asset, not a live provider result.</p></div></div>}
  </div>;
}

type IdeaProps = { mode: CreationMode; prompt: string; setPrompt: (v: string) => void; dialect: string; setDialect: (v: string) => void; duration: string; setDuration: (v: string) => void; format: '9:16' | '16:9' | '1:1'; setFormat: (v: '9:16' | '16:9' | '1:1') => void; uploadedImage: string | null; imageUpload: (e: ChangeEvent<HTMLInputElement>) => void; uploadedVideo: string | null; videoName: string; videoUpload: (e: ChangeEvent<HTMLInputElement>) => void; audioName: string; audioUpload: (e: ChangeEvent<HTMLInputElement>) => void; status: string; generating: boolean; progressIndex: number; generate: () => void };
function Idea(p: IdeaProps) { const needsImage = ['image-story', 'image-audio', 'image-video', 'ai-image', 'funny'].includes(p.mode); const uploadTitle = p.mode === 'funny' ? 'Upload a funny picture' : p.mode === 'ai-image' ? 'Browse an image to animate' : 'Upload JPG, PNG or WEBP'; return <div className="idea-grid"><div className="prompt-box"><label>మీ కథ ఆలోచన <span>{p.prompt.length}/1200</span></label><textarea maxLength={1200} value={p.prompt} onChange={(e) => p.setPrompt(e.target.value)} /><div className="prompt-tools"><button onClick={() => p.setPrompt(sample)}><Sparkles /> Funny idea</button><button onClick={() => p.setPrompt('వర్షంలో బస్ కోసం ఎదురుచూస్తున్న వ్యక్తికి ఒక టీ కొట్టు యజమాని చెప్పిన మాట జీవితం మార్చుతుంది.')}><RefreshCcw /> Inspire me</button></div>{needsImage && <><label className="upload"><Upload /><span><b>{p.uploadedImage ? 'Image ready - choose another' : uploadTitle}</b><small>JPG, PNG or WEBP up to 10 MB. The generated story is fictional.</small></span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={p.imageUpload} /></label>{p.uploadedImage && <div className="upload-preview"><img src={p.uploadedImage} alt="Uploaded preview" /><span><Check /> This image will be used</span></div>}</>}{p.mode === 'video-story' && <><label className="upload"><Video /><span><b>{p.videoName || 'Upload MP4, WebM or MOV'}</b><small>Max 100 MB. Add context in the prompt for better story results.</small></span><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={p.videoUpload} /></label>{p.uploadedVideo && <div className="upload-preview"><video src={p.uploadedVideo} controls /><span><Check /> Video selected</span></div>}</>}{p.mode === 'image-audio' && <label className="upload"><Music2 /><span><b>{p.audioName || 'Upload original audio'}</b><small>Your voice is preserved.</small></span><input type="file" accept="audio/*" onChange={p.audioUpload} /></label>}</div><aside className="settings"><h3>Video settings</h3><label>Telugu style<select value={p.dialect} onChange={(e) => p.setDialect(e.target.value)}><option>సహజ సంభాషణ</option><option>తెలంగాణ తెలుగు</option><option>ఆంధ్ర తెలుగు</option><option>రాయలసీమ శైలి</option><option>Urban Hyderabad</option></select></label><label>Duration<div className="segments">{['15 sec', '30 sec', '60 sec'].map((v) => <button className={p.duration === v ? 'active' : ''} onClick={() => p.setDuration(v)} key={v}>{v}</button>)}</div></label><label>Format<div className="segments">{(['9:16', '16:9', '1:1'] as const).map((v) => <button className={p.format === v ? 'active' : ''} onClick={() => p.setFormat(v)} key={v}>{v}</button>)}</div></label><div className="estimate"><Sparkles /><span><b>Development preview</b><small>Local, private browser workflow</small></span></div></aside><footer><span><i className="dot" />{p.status}</span><button className="primary large" disabled={p.generating} onClick={p.generate}>{p.generating ? <LoaderCircle className="spin" /> : <WandSparkles />}{p.generating ? progress[p.progressIndex] : 'కథను రూపొందించండి'}</button></footer></div>; }

type StoryProps = { story: StoryResult; setStory: (v: StoryResult) => void; updateScene: (id: string, field: keyof Scene, value: string | number) => void; dragged: React.MutableRefObject<number | null>; drop: (e: DragEvent, i: number) => void; regenerate: () => void; next: () => void; nextLabel: string };
function Story(p: StoryProps) { return <div className="story"><header><div><em>AI STORY DRAFT</em><input value={p.story.title} onChange={(e) => p.setStory({ ...p.story, title: e.target.value })} /><p>{p.story.genre}</p></div><span>DEMO PROVIDER</span></header><label className="summary">Story summary<textarea value={p.story.summary} onChange={(e) => p.setStory({ ...p.story, summary: e.target.value })} /></label><div className="scene-list">{p.story.scenes.map((scene, index) => <article draggable onDragStart={() => { p.dragged.current = index; }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => p.drop(e, index)} key={scene.id}><GripVertical /><img src={scene.image} alt="" /><div><em>SCENE {index + 1}</em><input value={scene.title} onChange={(e) => p.updateScene(scene.id, 'title', e.target.value)} /><textarea value={scene.description} onChange={(e) => p.updateScene(scene.id, 'description', e.target.value)} /><textarea className="dialogue" value={scene.dialogue} onChange={(e) => p.updateScene(scene.id, 'dialogue', e.target.value)} /></div><aside><label>Seconds<input type="number" min="2" max="20" value={scene.duration} onChange={(e) => p.updateScene(scene.id, 'duration', Number(e.target.value))} /></label><label>Camera<select value={scene.camera} onChange={(e) => p.updateScene(scene.id, 'camera', e.target.value)}><option>Slow push-in</option><option>Wide pan</option><option>Reaction close-up</option><option>Parallax</option></select></label><button className="icon" onClick={() => p.setStory({ ...p.story, scenes: p.story.scenes.filter((x) => x.id !== scene.id) })}><Trash2 /></button></aside></article>)}</div><footer><button className="secondary" onClick={p.regenerate}><RefreshCcw /> Regenerate story</button><button className="primary" onClick={p.next}>{p.nextLabel} <ChevronRight /></button></footer></div>; }

function Images(p: { choice: number; setChoice: (v: number) => void; setPreview: (v: string) => void; setStatus: (v: string) => void; back: () => void; next: () => void }) { return <div className="images-stage"><div className="workspace-title"><div><h3>Choose a visual direction</h3><p>Four distinct demo candidates for your story.</p></div><span>AI GENERATION MOCKED</span></div><div className="candidates">{demoImages.map((image, i) => <article className={p.choice === i ? 'selected' : ''} key={image}><div><img src={image} alt={`Candidate ${i + 1}`} /><i>0{i + 1}</i>{p.choice === i && <b><Check /> Selected</b>}</div><h4>{['Village warmth', 'Festival energy', 'Urban cinema', 'Monsoon emotion'][i]}</h4><p>{['Warm natural light', 'Vibrant celebration', 'Modern editorial', 'Atmospheric drama'][i]}</p><footer><button className="icon" onClick={() => p.setPreview(image)}><Play /></button><button className="icon" onClick={() => p.setStatus('Live regeneration requires a configured image API.')}><RefreshCcw /></button><a className="icon" href={image} download><Download /></a><button onClick={() => p.setChoice(i)}>{p.choice === i ? 'Selected' : 'Select'}</button></footer></article>)}</div><footer className="stage-footer"><button className="secondary" onClick={p.back}>Back to story</button><button className="primary" onClick={p.next}>Use this direction <ChevronRight /></button></footer></div>; }

type VoiceProps = { story: StoryResult; updateScene: (id: string, field: keyof Scene, v: string) => void; speak: () => void; voice: string; setVoice: (v: string) => void; voiceStyle: string; setVoiceStyle: (v: string) => void; speed: number; setSpeed: (v: number) => void; recording: boolean; startRecording: () => void; stop: () => void; audio: Blob | null; audioName: string; audioUpload: (e: ChangeEvent<HTMLInputElement>) => void; systemVoicePreviewed: boolean; next: () => void };
function Voice(p: VoiceProps) { const canContinue = Boolean(p.audio) || p.systemVoicePreviewed; return <div className="voice-grid"><section><div className="workspace-title"><div><h3>Telugu voice & dialogue</h3><p>Edit the spoken script before rendering.</p></div><button className="secondary" onClick={p.speak}><Play /> Preview Telugu system voice</button></div><p className="voice-note">A successful Telugu preview unlocks the editor. System voice is preview-only; record or upload audio when the downloaded video must contain narration.</p>{p.story.scenes.map((scene, i) => <label className="script-line" key={scene.id}><i>{i + 1}</i><textarea value={scene.dialogue} onChange={(e) => p.updateScene(scene.id, 'dialogue', e.target.value)} /></label>)}</section><aside className="settings"><h3>Voice settings</h3><label>Voice<div className="segments">{['Female', 'Male'].map((v) => <button className={p.voice === v ? 'active' : ''} onClick={() => p.setVoice(v)} key={v}>{v}</button>)}</div></label><label>Style<select value={p.voiceStyle} onChange={(e) => p.setVoiceStyle(e.target.value)}><option>Natural</option><option>Comedy</option><option>Storytelling</option><option>Energetic</option><option>Emotional</option></select></label><label>Speed <span>{p.speed.toFixed(2)}x</span><input type="range" min=".7" max="1.2" step=".05" value={p.speed} onChange={(e) => p.setSpeed(Number(e.target.value))} /></label>{p.recording ? <button className="record active" onClick={p.stop}><Square /> Stop recording</button> : <button className="record" onClick={p.startRecording}><Mic /> Record my voice</button>}<label className="upload-button"><Upload /> Upload audio<input type="file" accept="audio/*" onChange={p.audioUpload} /></label>{p.audio && <AudioPreview audio={p.audio} name={p.audioName} />}<p className="fine">Use only voices you own or have permission to use. Voice cloning is not enabled.</p></aside><footer><span>{p.audio ? 'Audio checked and ready for export.' : p.systemVoicePreviewed ? 'Telugu system voice preview selected.' : 'Preview a Telugu system voice, record, or upload audio.'}</span><button className="primary" disabled={!canContinue} onClick={p.next}>Open editor <ChevronRight /></button></footer></div>; }

function AudioPreview({ audio, name }: { audio: Blob; name: string }) { const url = useMemo(() => URL.createObjectURL(audio), [audio]); useEffect(() => () => URL.revokeObjectURL(url), [url]); return <div className="audio-ready"><AudioLines /><span><b>Audio ready</b><small>{name}</small><audio controls src={url} /></span><Check /></div>; }

function Editor(p: { story: StoryResult; format: string; subtitle: string; setSubtitle: (v: string) => void; speak: () => void; status: string; hasAudio: boolean; usesSystemVoice: boolean; rendering: boolean; renderProgress: number; render: () => void }) { return <div className="editor"><div className={`video-preview f-${p.format.replace(':', '')}`}><img src={p.story.scenes[0].image} alt="Preview" /><div />{p.subtitle !== 'None' && <p>{p.story.scenes[0].dialogue}</p>}<button onClick={p.speak}><Play fill="currentColor" /></button></div><aside className="settings"><h3>Finishing</h3><label>Subtitles<select value={p.subtitle} onChange={(e) => p.setSubtitle(e.target.value)}><option>None</option><option>Telugu</option><option>English</option><option>Telugu + English</option></select></label><label>Quality<div className="segments"><button className="active">720p</button><button onClick={() => undefined}>1080p</button></div></label><label>Voice volume<input type="range" defaultValue="90" /></label><label>Music volume<input type="range" defaultValue="22" /></label></aside><div className="timeline">{[[Film, 'Video'], [Mic, 'Voice'], [Music2, 'Music'], [Subtitles, 'Subtitles']].map(([Icon, label], row) => <div className="track" key={label as string}><span>{typeof Icon !== 'string' && <Icon size={15} />} {label as string}</span><div>{p.story.scenes.map((scene, i) => <i className={`clip c${row}`} style={{ flex: scene.duration }} key={scene.id}>{row === 0 ? `S${i + 1}` : ''}</i>)}</div></div>)}</div><footer><span>{p.hasAudio ? p.status : p.usesSystemVoice ? 'Preview works, but download needs recorded/uploaded audio. Return to Voice and add audio.' : 'Return to Voice and record or upload Telugu audio.'}{p.rendering && <i className="render-bar"><b style={{ width: `${p.renderProgress}%` }} /></i>}</span><button className="primary" disabled={p.rendering || !p.hasAudio} onClick={p.render}>{p.rendering ? <LoaderCircle className="spin" /> : <Clapperboard />}{p.rendering ? `Rendering ${p.renderProgress}%` : 'Render with audio'}</button></footer></div>; }

function Export(p: { story: StoryResult; videoUrl: string; audio: Blob | null; audioName: string; script: string; total: number; format: string; reset: () => void }) { const audioUrl = useMemo(() => p.audio ? URL.createObjectURL(p.audio) : '', [p.audio]); useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); }, [audioUrl]); return <div className="export"><div className="result">{p.videoUrl ? <video controls src={p.videoUrl} /> : <img src={p.story.scenes[0].image} alt="Result" />}<span>AI-assisted content</span></div><section><i><Check /></i><em>VIDEO READY</em><h2>{p.story.title}</h2><p>{p.total} sec · {p.format} · 720p · WebM browser render</p><div>{p.videoUrl && <a className="primary" href={p.videoUrl} download="telugu-ai-video.webm"><Download /> Download video</a>}<button className="secondary" onClick={() => downloadText(p.script, 'telugu-script.txt')}><Download /> Telugu script</button><button className="secondary" onClick={() => downloadText(srt(p.story.scenes), 'telugu-subtitles.srt')}><Subtitles /> Subtitles</button>{audioUrl && <a className="secondary" href={audioUrl} download={p.audioName}><AudioLines /> Audio</a>}</div><button className="text-button" onClick={p.reset}>Create another video <ChevronRight /></button></section></div>; }

function Projects(p: { projects: Project[]; setProjects: React.Dispatch<React.SetStateAction<Project[]>>; onCreate: () => void }) { return <section className="projects content"><div className="page-title"><div><em>YOUR WORKSPACE</em><h1>My Creations</h1><p>మీ కథలు, వీడియోలు, డ్రాఫ్టులు అన్నీ ఒకేచోట.</p></div><button className="primary" onClick={p.onCreate}><Plus /> New creation</button></div><div className="project-table"><header><span>Project</span><span>Mode</span><span>Duration</span><span>Status</span><span /></header>{p.projects.map((project) => <article key={project.id}><div><img src={project.image} alt="" /><span><b>{project.title}</b><small>{project.date}</small></span></div><span>{project.mode}</span><span>{project.duration}s</span><i className={project.status.toLowerCase()}>{project.status}</i><aside><button className="icon" onClick={() => p.setProjects((items) => [{ ...project, id: crypto.randomUUID(), title: `${project.title} copy` }, ...items])}><Copy /></button><button className="icon" onClick={() => p.setProjects((items) => items.filter((item) => item.id !== project.id))}><Trash2 /></button></aside></article>)}</div></section>; }
