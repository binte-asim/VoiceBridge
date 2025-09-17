import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LanguageSelector from '@/components/translator/LanguageSelector';
import TranslationControls from '@/components/translator/TranslationControls';
import CaptionDisplay from '@/components/translator/CaptionDisplay';
import ConnectionStatus from '@/components/translator/ConnectionStatus';
import UserSection from '@/components/translator/UserSection';
import { TranslatorProvider } from '@/contexts/TranslatorContext';
import { BluetoothProvider } from '@/contexts/BluetoothContext';

export default function TranslatorScreen() {
  return (
    <BluetoothProvider>
      <TranslatorProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Speech Translator</Text>
              <ConnectionStatus />
            </View>

            {/* User Sections */}
            <View style={styles.usersContainer}>
              <UserSection 
                userId="userA"
                label="Person A"
                accentColor="#3B82F6"
              />
              
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>↔</Text>
                <View style={styles.dividerLine} />
              </View>
              
              <UserSection 
                userId="userB"
                label="Person B"
                accentColor="#10B981"
              />
            </View>

            {/* Translation Controls */}
            <TranslationControls />

            {/* Live Captions */}
            <CaptionDisplay />
          </ScrollView>
        </SafeAreaView>
      </TranslatorProvider>
    </BluetoothProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  usersContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '600',
  },
});