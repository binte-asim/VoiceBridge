export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
  confidence?: number;
}

export interface SpeechToTextResponse {
  text: string;
  language: string;
  confidence: number;
}

export interface TextToSpeechResponse {
  audioUrl: string;
  duration: number;
}

export class TranslationService {
  private openAIApiKey: string | null = null;
  private elevenLabsApiKey: string | null = null;
  private translationApiKey: string | null = null;

  setAPIKeys(keys: {
    openAI?: string;
    elevenLabs?: string;
    translation?: string;
  }) {
    if (keys.openAI) this.openAIApiKey = keys.openAI;
    if (keys.elevenLabs) this.elevenLabsApiKey = keys.elevenLabs;
    if (keys.translation) this.translationApiKey = keys.translation;
  }

  async speechToText(audioUri: string, language: string = 'auto'): Promise<SpeechToTextResponse> {
    if (!this.openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      // Create form data for Whisper API
      const formData = new FormData();
      
      // Convert audio file to blob for web or create proper file object
      const audioBlob = await fetch(audioUri).then(r => r.blob());
      formData.append('file', audioBlob, 'audio.m4a');
      formData.append('model', 'whisper-1');
      
      if (language !== 'auto') {
        formData.append('language', language);
      }

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openAIApiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Whisper API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        text: result.text,
        language: result.language || language,
        confidence: 0.95, // Whisper doesn't return confidence, using default
      };
    } catch (error) {
      console.error('Speech to text error:', error);
      throw error;
    }
  }

  async translateText(
    text: string, 
    fromLanguage: string, 
    toLanguage: string
  ): Promise<TranslationResponse> {
    try {
      // Using Google Translate API (you can switch to other services)
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLanguage}&tl=${toLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const result = await response.json();
      const translatedText = result[0][0][0];
      const detectedLanguage = result[2];

      return {
        translatedText,
        detectedLanguage,
        confidence: 0.9,
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async textToSpeech(
    text: string, 
    language: string, 
    voiceId?: string
  ): Promise<TextToSpeechResponse> {
    if (!this.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      // Use ElevenLabs TTS API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'pNInz6obpgDQGcFmaJgB'}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        audioUrl,
        duration: 5, // Estimate, you might want to get actual duration
      };
    } catch (error) {
      console.error('Text to speech error:', error);
      throw error;
    }
  }

  async createVoiceClone(audioSamples: string[]): Promise<string> {
    if (!this.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      // This would create a voice clone using ElevenLabs Voice Lab
      const formData = new FormData();
      formData.append('name', `Voice_${Date.now()}`);
      
      // Add audio samples
      for (let i = 0; i < audioSamples.length; i++) {
        const audioBlob = await fetch(audioSamples[i]).then(r => r.blob());
        formData.append('files', audioBlob, `sample_${i}.wav`);
      }

      const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
          'xi-api-key': this.elevenLabsApiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Voice cloning API error: ${response.status}`);
      }

      const result = await response.json();
      return result.voice_id;
    } catch (error) {
      console.error('Voice cloning error:', error);
      throw error;
    }
  }
}

export const translationService = new TranslationService();