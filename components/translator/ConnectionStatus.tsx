import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bluetooth, BluetoothConnected, Wifi } from 'lucide-react-native';
import { useBluetoothContext } from '@/contexts/BluetoothContext';

export default function ConnectionStatus() {
  const { isConnected, connectedDevice, isScanning } = useBluetoothContext();

  return (
    <View style={styles.container}>
      {/* Bluetooth Status */}
      <View style={styles.statusItem}>
        {isConnected ? (
          <BluetoothConnected size={16} color="#10B981" />
        ) : (
          <Bluetooth size={16} color={isScanning ? "#F59E0B" : "#6B7280"} />
        )}
        <Text style={[
          styles.statusText,
          isConnected && styles.connectedText
        ]}>
          {isConnected 
            ? connectedDevice?.name || 'Connected'
            : (isScanning ? 'Scanning...' : 'No device')
          }
        </Text>
      </View>

      {/* Internet Status */}
      <View style={styles.statusItem}>
        <Wifi size={16} color="#10B981" />
        <Text style={[styles.statusText, styles.connectedText]}>
          Online
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  connectedText: {
    color: '#10B981',
    fontWeight: '600',
  },
});