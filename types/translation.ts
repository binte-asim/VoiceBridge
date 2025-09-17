export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export interface TranslationSession {
  id: string;
  userA: {
    language: string;
    voiceId?: string;
  };
  userB: {
    language: string;
    voiceId?: string;
  };
  startTime: Date;
  endTime?: Date;
  messageCount: number;
}

export interface TranslationMessage {
  id: string;
  sessionId: string;
  speaker: 'userA' | 'userB';
  originalText: string;
  translatedText: string;
  originalLanguage: string;
  targetLanguage: string;
  audioUri?: string;
  translatedAudioUri?: string;
  timestamp: Date;
  processingTime: number;
}

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  language: string;
  voiceId: string; // ElevenLabs voice ID
  sampleAudioUris: string[];
  createdAt: Date;
  isActive: boolean;
}

export interface APIConfiguration {
  openAI: {
    apiKey?: string;
    model: string;
  };
  elevenLabs: {
    apiKey?: string;
    defaultVoiceId: string;
  };
  translation: {
    provider: 'google' | 'azure' | 'aws';
    apiKey?: string;
  };
}