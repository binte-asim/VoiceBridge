import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Mic, Square, Volume2 } from 'lucide-react-native';
import { useTranslator } from '@/contexts/TranslatorContext';

const { width } = Dimensions.get('window');

export default function TranslationControls() {
  const { 
    isTranslating, 
    isListening, 
    startTranslation, 
    stopTranslation, 
    currentSpeaker 
  } = useTranslator();

  const handleToggleTranslation = () => {
    if (isTranslating) {
      stopTranslation();
    } else {
      startTranslation();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator,
          isTranslating ? styles.activeIndicator : styles.inactiveIndicator
        ]}>
          {isListening ? (
            <Mic size={20} color="#FFFFFF" />
          ) : (
            <Volume2 size={20} color="#FFFFFF" />
          )}
        </View>
        
        <View style={styles.statusText}>
          <Text style={styles.statusTitle}>
            {isTranslating ? 'Translation Active' : 'Translation Inactive'}
          </Text>
          <Text style={styles.statusSubtitle}>
            {isTranslating 
              ? (isListening ? `Listening to ${currentSpeaker}...` : 'Ready for conversation')
              : 'Tap to start translating'
            }
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.mainButton,
          isTranslating ? styles.stopButton : styles.startButton
        ]}
        onPress={handleToggleTranslation}
        activeOpacity={0.8}
      >
        {isTranslating ? (
          <>
            <Square size={32} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.buttonText}>Stop Translation</Text>
          </>
        ) : (
          <>
            <Mic size={32} color="#FFFFFF" />
            <Text style={styles.buttonText}>Start Translation</Text>
          </>
        )}
      </TouchableOpacity>

      {isTranslating && (
        <Text style={styles.instructionText}>
          Speak naturally and wait for translation to complete before the other person responds
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activeIndicator: {
    backgroundColor: '#10B981',
  },
  inactiveIndicator: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 50,
    minWidth: width * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  startButton: {
    backgroundColor: '#3B82F6',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});