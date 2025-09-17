import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Bluetooth, BluetoothConnected, Headphones, RefreshCw } from 'lucide-react-native';
import { useBluetoothContext } from '@/contexts/BluetoothContext';

export default function BluetoothManager() {
  const {
    isEnabled,
    isScanning,
    isConnected,
    connectedDevice,
    availableDevices,
    enableBluetooth,
    startScanning,
    stopScanning,
    connectToDevice,
    disconnectDevice,
  } = useBluetoothContext();

  if (!isEnabled) {
    return (
      <View style={styles.container}>
        <View style={styles.disabledContainer}>
          <Bluetooth size={64} color="#6B7280" />
          <Text style={styles.disabledTitle}>Bluetooth is Disabled</Text>
          <Text style={styles.disabledSubtitle}>
            Enable Bluetooth to connect to your headphones
          </Text>
          <TouchableOpacity style={styles.enableButton} onPress={enableBluetooth}>
            <Text style={styles.enableButtonText}>Enable Bluetooth</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderDeviceItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        item.id === connectedDevice?.id && styles.connectedDeviceItem
      ]}
      onPress={() => {
        if (item.id === connectedDevice?.id) {
          disconnectDevice();
        } else {
          connectToDevice(item);
        }
      }}
    >
      <View style={styles.deviceIcon}>
        <Headphones 
          size={24} 
          color={item.id === connectedDevice?.id ? "#10B981" : "#6B7280"} 
        />
      </View>
      
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name || 'Unknown Device'}</Text>
        <Text style={styles.deviceAddress}>{item.id}</Text>
      </View>

      <View style={styles.deviceStatus}>
        {item.id === connectedDevice?.id ? (
          <BluetoothConnected size={20} color="#10B981" />
        ) : (
          <Bluetooth size={20} color="#6B7280" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Connected Device Section */}
      {isConnected && connectedDevice && (
        <View style={styles.connectedSection}>
          <Text style={styles.sectionTitle}>Connected Device</Text>
          <View style={styles.connectedDevice}>
            <BluetoothConnected size={32} color="#10B981" />
            <View style={styles.connectedDeviceInfo}>
              <Text style={styles.connectedDeviceName}>
                {connectedDevice.name || 'Unknown Device'}
              </Text>
              <Text style={styles.connectedDeviceAddress}>
                {connectedDevice.id}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={disconnectDevice}
            >
              <Text style={styles.disconnectButtonText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Available Devices Section */}
      <View style={styles.availableSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Devices</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={isScanning ? stopScanning : startScanning}
            disabled={isScanning}
          >
            {isScanning ? (
              <ActivityIndicator size="small" color="#3B82F6" />
            ) : (
              <RefreshCw size={20} color="#3B82F6" />
            )}
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Scan'}
            </Text>
          </TouchableOpacity>
        </View>

        {availableDevices.length === 0 ? (
          <View style={styles.emptyState}>
            <Headphones size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No devices found</Text>
            <Text style={styles.emptySubtitle}>
              Make sure your headphones are in pairing mode and tap scan
            </Text>
          </View>
        ) : (
          <FlatList
            data={availableDevices}
            renderItem={renderDeviceItem}
            keyExtractor={(item) => item.id}
            style={styles.deviceList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  disabledContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  disabledTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  disabledSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  enableButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  enableButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  connectedSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  connectedDevice: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  connectedDeviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  connectedDeviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  connectedDeviceAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  disconnectButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  disconnectButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  availableSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scanButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 8,
  },
  deviceList: {
    flex: 1,
  },
  deviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  connectedDeviceItem: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  deviceAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  deviceStatus: {
    marginLeft: 12,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});