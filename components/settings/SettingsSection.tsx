import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Settings, Volume2, Mic, Globe } from 'lucide-react-native';

export default function SettingsSection() {
  const [showCaptions, setShowCaptions] = React.useState(true);
  const [autoDetect, setAutoDetect] = React.useState(false);
  const [voiceCloning, setVoiceCloning] = React.useState(true);

  const settingSections = [
    {
      title: 'Translation Settings',
      icon: Globe,
      items: [
        {
          title: 'Show Live Captions',
          subtitle: 'Display real-time captions during translation',
          value: showCaptions,
          onValueChange: setShowCaptions,
          type: 'switch'
        },
        {
          title: 'Auto Language Detection',
          subtitle: 'Automatically detect spoken language',
          value: autoDetect,
          onValueChange: setAutoDetect,
          type: 'switch'
        }
      ]
    },
    {
      title: 'Audio Settings',
      icon: Volume2,
      items: [
        {
          title: 'Voice Cloning',
          subtitle: 'Use voice cloning for more natural translations',
          value: voiceCloning,
          onValueChange: setVoiceCloning,
          type: 'switch'
        },
        {
          title: 'Audio Quality',
          subtitle: 'High quality audio processing',
          type: 'option',
          value: 'High'
        }
      ]
    }
  ];

  const renderSettingItem = (item: any, index: number) => (
    <View key={index} style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#60A5FA' }}
          thumbColor={item.value ? '#3B82F6' : '#F3F4F6'}
        />
      ) : (
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>{item.value}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSection = (section: any, sectionIndex: number) => (
    <View key={sectionIndex} style={styles.section}>
      <View style={styles.sectionHeader}>
        <section.icon size={24} color="#3B82F6" />
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      
      <View style={styles.sectionContent}>
        {section.items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {settingSections.map(renderSection)}
      
      {/* API Configuration Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings size={24} color="#3B82F6" />
          <Text style={styles.sectionTitle}>API Configuration</Text>
        </View>
        
        <View style={styles.sectionContent}>
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Configure OpenAI API Key</Text>
            <Text style={styles.configButtonSubtext}>For Whisper speech recognition</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Configure ElevenLabs API Key</Text>
            <Text style={styles.configButtonSubtext}>For voice cloning and TTS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Configure Translation Service</Text>
            <Text style={styles.configButtonSubtext}>Google Translate or Azure</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  configButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  configButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  configButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
});