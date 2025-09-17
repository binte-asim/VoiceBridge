import React, { createContext, useContext, useState, useCallback } from 'react';

interface Caption {
  id: string;
  speaker: 'userA' | 'userB';
  originalText: string;
  translatedText?: string;
  originalLanguage: string;
  translatedLanguage: string;
  timestamp: Date;
  isProcessing: boolean;
}

interface UserSettings {
  speaksLanguage: string;
  hearsLanguage: string;
  voiceModel?: string;
}

interface TranslatorContextType {
  // State
  isTranslating: boolean;
  isListening: boolean;
  currentSpeaker: 'userA' | 'userB' | null;
  captions: Caption[];
  userSettings: {
    userA: UserSettings;
    userB: UserSettings;
  };
  
  // Actions
  startTranslation: () => void;
  stopTranslation: () => void;
  updateUserLanguage: (userId: 'userA' | 'userB', field: keyof UserSettings, value: string) => void;
  processAudio: (audioData: any, speaker: 'userA' | 'userB') => Promise<void>;
}

const TranslatorContext = createContext<TranslatorContextType | undefined>(undefined);

export function TranslatorProvider({ children }: { children: React.ReactNode }) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'userA' | 'userB' | null>(null);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [userSettings, setUserSettings] = useState({
    userA: {
      speaksLanguage: 'en',
      hearsLanguage: 'ar',
    },
    userB: {
      speaksLanguage: 'ar',
      hearsLanguage: 'en',
    },
  });

  const startTranslation = useCallback(() => {
    setIsTranslating(true);
    setIsListening(true);
    setCurrentSpeaker('userA'); // Start with user A
  }, []);

  const stopTranslation = useCallback(() => {
    setIsTranslating(false);
    setIsListening(false);
    setCurrentSpeaker(null);
  }, []);

  const updateUserLanguage = useCallback((
    userId: 'userA' | 'userB', 
    field: keyof UserSettings, 
    value: string
  ) => {
    setUserSettings(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
  }, []);

  // Simulate speech-to-text and translation process
  const processAudio = useCallback(async (audioData: any, speaker: 'userA' | 'userB') => {
    const captionId = Date.now().toString();
    const speakerSettings = userSettings[speaker];
    const targetUser = speaker === 'userA' ? 'userB' : 'userA';
    const targetSettings = userSettings[targetUser];

    // Add initial caption with processing state
    const newCaption: Caption = {
      id: captionId,
      speaker,
      originalText: '',
      originalLanguage: speakerSettings.speaksLanguage,
      translatedLanguage: targetSettings.hearsLanguage,
      timestamp: new Date(),
      isProcessing: true,
    };

    setCaptions(prev => [newCaption, ...prev]);

    try {
      // Simulate speech-to-text processing
      setIsListening(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOriginalText = getMockText(speakerSettings.speaksLanguage);
      
      // Update with original text
      setCaptions(prev => prev.map(caption => 
        caption.id === captionId 
          ? { ...caption, originalText: mockOriginalText }
          : caption
      ));

      // Simulate translation processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockTranslatedText = getMockTranslation(
        mockOriginalText, 
        speakerSettings.speaksLanguage, 
        targetSettings.hearsLanguage
      );

      // Update with translation and complete processing
      setCaptions(prev => prev.map(caption => 
        caption.id === captionId 
          ? { 
              ...caption, 
              translatedText: mockTranslatedText,
              isProcessing: false 
            }
          : caption
      ));

      // Switch to the other speaker
      setCurrentSpeaker(targetUser);
      
    } catch (error) {
      console.error('Translation error:', error);
      setCaptions(prev => prev.map(caption => 
        caption.id === captionId 
          ? { ...caption, isProcessing: false }
          : caption
      ));
    }
  }, [userSettings]);

  const value: TranslatorContextType = {
    isTranslating,
    isListening,
    currentSpeaker,
    captions,
    userSettings,
    startTranslation,
    stopTranslation,
    updateUserLanguage,
    processAudio,
  };

  return (
    <TranslatorContext.Provider value={value}>
      {children}
    </TranslatorContext.Provider>
  );
}

export function useTranslator() {
  const context = useContext(TranslatorContext);
  if (context === undefined) {
    throw new Error('useTranslator must be used within a TranslatorProvider');
  }
  return context;
}

// Mock functions for demonstration
function getMockText(language: string): string {
  const mockTexts = {
    en: "Hello, how are you today? I hope you're having a great day.",
    ar: "مرحبا، كيف حالك اليوم؟ أتمنى أن تقضي يوماً رائعاً",
    ur: "ہیلو، آج آپ کیسے ہیں؟ امید ہے آپ کا دن اچھا گزر رہا ہو",
  };
  
  return mockTexts[language as keyof typeof mockTexts] || "Sample text";
}

function getMockTranslation(text: string, fromLang: string, toLang: string): string {
  const translations = {
    'en-ar': "مرحبا، كيف حالك اليوم؟ أتمنى أن تقضي يوماً رائعاً",
    'en-ur': "ہیلو، آج آپ کیسے ہیں؟ امید ہے آپ کا دن اچھا گزر رہا ہو",
    'ar-en': "Hello, how are you today? I hope you're having a great day.",
    'ar-ur': "ہیلو، آج آپ کیسے ہیں؟ امید ہے آپ کا دن اچھا گزر رہا ہو",
    'ur-en': "Hello, how are you today? I hope you're having a great day.",
    'ur-ar': "مرحبا، كيف حالك اليوم؟ أتمنى أن تقضي يوماً رائعاً",
  };
  
  const key = `${fromLang}-${toLang}`;
  return translations[key as keyof typeof translations] || "Translation completed";
}