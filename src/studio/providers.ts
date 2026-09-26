export type CreationMode =
  | 'prompt'
  | 'image-story'
  | 'image-audio'
  | 'image-video'
  | 'video-story'
  | 'ai-image'
  | 'funny'
  | 'story';

export type Scene = {
  id: string;
  title: string;
  description: string;
  dialogue: string;
  camera: string;
  duration: number;
  image: string;
};

export type StoryResult = {
  title: string;
  genre: string;
  summary: string;
  characters: string[];
  scenes: Scene[];
};

export interface LLMProvider {
  generateStory(prompt: string, mode: CreationMode, dialect: string): Promise<StoryResult>;
}

export interface ImageGenerationProvider {
  generateImages(prompt: string, count: number): Promise<string[]>;
}

export interface VideoGenerationProvider {
  generateVideo(scene: Scene): Promise<{ jobId: string }>;
}

export interface TextToSpeechProvider {
  generateSpeech(text: string, voice: string): Promise<{ audioUrl: string }>;
}

export interface SpeechToTextProvider {
  transcribeAudio(file: File): Promise<{ text: string; language: string }>;
}

export interface StorageProvider {
  upload(file: File, path: string): Promise<{ url: string; key: string }>;
}

export const demoImages = [
  './studio/tea-stall.png',
  './studio/festival.png',
  './studio/hyderabad-rooftop.png',
  './studio/monsoon.png',
];

const sleep = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export class DevelopmentLLMProvider implements LLMProvider {
  async generateStory(prompt: string, mode: CreationMode, dialect: string): Promise<StoryResult> {
    await sleep(500);
    const funny = mode === 'funny';
    const idea = prompt.trim();
    const title = idea.length > 34 ? `${idea.slice(0, 34)}...` : idea;

    return {
      title: funny ? 'బిర్యానీ బిల్లు ఎవరిది?' : title,
      genre: funny ? 'Original Telugu comedy' : 'Cinematic slice of life',
      summary: `${dialect} శైలిలో మీ ఆలోచన ఆధారంగా రూపొందించిన కల్పిత కథ: ${idea}`,
      characters: ['రాజు - మాటకారి స్నేహితుడు', 'బాలు - ప్రశాంతంగా పంచ్ ఇచ్చే స్నేహితుడు'],
      scenes: [
        {
          id: crypto.randomUUID(),
          title: 'సాయంత్రపు టీ',
          description: `ప్రారంభ సన్నివేశం మీ ఆలోచనను పరిచయం చేస్తుంది: ${idea}`,
          dialogue: `మన కథ ఇలా మొదలవుతుంది. ${idea}`,
          camera: 'Slow push-in',
          duration: 5,
          image: demoImages[0],
        },
        {
          id: crypto.randomUUID(),
          title: 'పండుగ సందడి',
          description: 'కథ మధ్యలో పాత్రల భావాలు, పరిసరాలు మరియు ముఖ్యమైన మలుపు సినిమాటిక్‌గా కనిపిస్తాయి.',
          dialogue: `ఈ క్షణంలో కథ కొత్త మలుపు తీసుకుంటుంది. ${idea}`,
          camera: 'Wide pan',
          duration: 5,
          image: demoImages[1],
        },
        {
          id: crypto.randomUUID(),
          title: 'అసలు ట్విస్ట్',
          description: 'చివరి సన్నివేశం కథలోని భావాన్ని ముగింపుతో కలిపి చూపిస్తుంది.',
          dialogue: `చివరికి ఈ కథ మనకు ఒక అందమైన జ్ఞాపకాన్ని మిగులుస్తుంది. ${idea}`,
          camera: 'Reaction close-up',
          duration: 5,
          image: demoImages[3],
        },
      ],
    };
  }
}

export class DevelopmentImageProvider implements ImageGenerationProvider {
  async generateImages(_prompt: string, count: number): Promise<string[]> {
    await sleep(400);
    return demoImages.slice(0, Math.max(1, Math.min(count, demoImages.length)));
  }
}

export const providers = {
  llm: new DevelopmentLLMProvider(),
  images: new DevelopmentImageProvider(),
  mode: 'development-mock' as const,
};
