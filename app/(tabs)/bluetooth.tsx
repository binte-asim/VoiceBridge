import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BluetoothManager from '@/components/bluetooth/BluetoothManager';
import { BluetoothProvider } from '@/contexts/BluetoothContext';

export default function BluetoothScreen() {
  return (
    <BluetoothProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        <View style={styles.header}>
          <Text style={styles.title}>Bluetooth Devices</Text>
          <Text style={styles.subtitle}>
            Connect your headphones for the best translation experience
          </Text>
        </View>

        <BluetoothManager />
      </SafeAreaView>
    </BluetoothProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
});