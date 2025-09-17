import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  label: string;
  disabled?: boolean;
}

export default function LanguageSelector({ 
  selectedLanguage, 
  onLanguageChange, 
  label, 
  disabled = false 
}: LanguageSelectorProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage) || LANGUAGES[0];

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language.code);
    setIsModalVisible(false);
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        item.code === selectedLanguage && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageSelect(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.languageInfo}>
        <Text style={[
          styles.languageName,
          item.code === selectedLanguage && styles.selectedLanguageName
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.nativeName,
          item.code === selectedLanguage && styles.selectedNativeName
        ]}>
          {item.nativeName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={[styles.selector, disabled && styles.disabledSelector]}
        onPress={() => !disabled && setIsModalVisible(true)}
        disabled={disabled}
      >
        <View style={styles.selectedLanguage}>
          <Text style={styles.selectedFlag}>{selectedLang.flag}</Text>
          <View style={styles.selectedLanguageInfo}>
            <Text style={styles.selectedLanguageName}>{selectedLang.name}</Text>
            <Text style={styles.selectedNativeName}>{selectedLang.nativeName}</Text>
          </View>
        </View>
        <ChevronDown 
          size={20} 
          color={disabled ? '#9CA3AF' : '#6B7280'} 
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
            </View>
            
            <FlatList
              data={LANGUAGES}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  disabledSelector: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  selectedLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  selectedLanguageInfo: {
    flex: 1,
  },
  selectedLanguageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedNativeName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    maxHeight: '70%',
    width: '80%',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedLanguageItem: {
    backgroundColor: '#EFF6FF',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  nativeName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});