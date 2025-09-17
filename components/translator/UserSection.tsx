import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LanguageSelector from './LanguageSelector';
import { useTranslator } from '@/contexts/TranslatorContext';

interface UserSectionProps {
  userId: 'userA' | 'userB';
  label: string;
  accentColor: string;
}

export default function UserSection({ userId, label, accentColor }: UserSectionProps) {
  const { 
    userSettings, 
    updateUserLanguage, 
    isTranslating 
  } = useTranslator();

  const userConfig = userSettings[userId];

  return (
    <View style={[styles.container, { borderColor: accentColor }]}>
      <View style={styles.header}>
        <Text style={[styles.userLabel, { color: accentColor }]}>
          {label}
        </Text>
      </View>

      <View style={styles.languageSelectors}>
        <LanguageSelector
          selectedLanguage={userConfig.speaksLanguage}
          onLanguageChange={(lang) => updateUserLanguage(userId, 'speaksLanguage', lang)}
          label="Language I Speak"
          disabled={isTranslating}
        />

        <LanguageSelector
          selectedLanguage={userConfig.hearsLanguage}
          onLanguageChange={(lang) => updateUserLanguage(userId, 'hearsLanguage', lang)}
          label="Language I Want to Hear"
          disabled={isTranslating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
  },
  userLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  languageSelectors: {
    gap: 16,
  },
});