import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslator } from '@/contexts/TranslatorContext';

export default function CaptionDisplay() {
  const { captions, isListening } = useTranslator();

  if (captions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Live Captions</Text>
          <Text style={styles.emptySubtitle}>
            Start translation to see live captions here
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Captions</Text>
        {isListening && (
          <View style={styles.listeningIndicator}>
            <View style={styles.pulse} />
            <Text style={styles.listeningText}>Listening...</Text>
          </View>
        )}
      </View>

      <ScrollView 
        style={styles.captionsScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.captionsContainer}
      >
        {captions.map((caption) => (
          <View 
            key={caption.id} 
            style={[
              styles.captionItem,
              caption.speaker === 'userA' ? styles.userACaption : styles.userBCaption
            ]}
          >
            <View style={styles.captionHeader}>
              <Text style={styles.speakerLabel}>
                {caption.speaker === 'userA' ? 'Person A' : 'Person B'}
              </Text>
              <Text style={styles.languageLabel}>
                {caption.originalLanguage.toUpperCase()} → {caption.translatedLanguage.toUpperCase()}
              </Text>
            </View>
            
            <Text style={styles.originalText}>{caption.originalText}</Text>
            
            {caption.translatedText && (
              <Text style={styles.translatedText}>{caption.translatedText}</Text>
            )}
            
            {caption.isProcessing && (
              <Text style={styles.processingText}>Translating...</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listeningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  listeningText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  captionsScrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: 400,
  },
  captionsContainer: {
    padding: 16,
  },
  captionItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  userACaption: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#3B82F6',
  },
  userBCaption: {
    backgroundColor: '#ECFDF5',
    borderLeftColor: '#10B981',
  },
  captionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  speakerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  languageLabel: {
    fontSize: 10,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  originalText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  translatedText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '500',
    lineHeight: 24,
  },
  processingText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});