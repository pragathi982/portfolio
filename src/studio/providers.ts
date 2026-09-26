export type CreationMode =
  | 'prompt'
  | 'image-story'
  | 'image-audio'
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

    return {
      title: funny ? 'బిర్యానీ బిల్లు ఎవరిది?' : 'టీ కొట్టు దగ్గర ఒక కథ',
      genre: funny ? 'Original Telugu comedy' : 'Cinematic slice of life',
      summary: `${dialect} శైలిలో రూపొందించిన కల్పిత కథ. మీ ఆలోచన: ${prompt}`,
      characters: ['రాజు - మాటకారి స్నేహితుడు', 'బాలు - ప్రశాంతంగా పంచ్ ఇచ్చే స్నేహితుడు'],
      scenes: [
        {
          id: crypto.randomUUID(),
          title: 'సాయంత్రపు టీ',
          description: 'సూర్యాస్తమయంలో గ్రామం చివర ఉన్న టీ కొట్టు. ఇద్దరు స్నేహితులు వేడి టీతో కబుర్లు మొదలుపెడతారు.',
          dialogue: 'రాజు: ఈ ఊరిలో నాకంటే తెలివైనవాడు లేడు! బాలు: అవునా? అయితే నిన్నటి టీ బిల్లు ఎవరు కట్టారో చెప్పు.',
          camera: 'Slow push-in',
          duration: 5,
          image: demoImages[0],
        },
        {
          id: crypto.randomUUID(),
          title: 'పండుగ సందడి',
          description: 'వీధంతా దీపాలు, సంగీతం. మాటల మధ్య చిన్న అపార్థం పెద్ద నవ్వుగా మారుతుంది.',
          dialogue: 'రాజు: బిల్లు నేను కట్టాననుకున్నా! బాలు: నువ్వు ఫోటోకి పోజు ఇచ్చావు, బిల్లు కాదు.',
          camera: 'Wide pan',
          duration: 5,
          image: demoImages[1],
        },
        {
          id: crypto.randomUUID(),
          title: 'అసలు ట్విస్ట్',
          description: 'వర్షం మొదలవుతుంది. టీ కొట్టు యజమాని పాత బాకీల పుస్తకం తీస్తాడు.',
          dialogue: 'యజమాని: మీ ఇద్దరి పేర్లు కాదు బాబూ... గత నెల నుంచి మొత్తం ఊరి పేరు ఉంది!',
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
