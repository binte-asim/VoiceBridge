import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';

interface BluetoothDevice {
  id: string;
  name?: string;
  isConnected: boolean;
}

interface BluetoothContextType {
  // State
  isEnabled: boolean;
  isScanning: boolean;
  isConnected: boolean;
  connectedDevice: BluetoothDevice | null;
  availableDevices: BluetoothDevice[];
  
  // Actions
  enableBluetooth: () => Promise<void>;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  connectToDevice: (device: BluetoothDevice) => Promise<void>;
  disconnectDevice: () => Promise<void>;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export function BluetoothProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true); // Assume enabled for web demo
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);

  // Mock devices for demonstration
  const mockDevices: BluetoothDevice[] = [
    { id: '00:11:22:33:44:55', name: 'AirPods Pro', isConnected: false },
    { id: '11:22:33:44:55:66', name: 'Sony WH-1000XM4', isConnected: false },
    { id: '22:33:44:55:66:77', name: 'Bose QuietComfort', isConnected: false },
    { id: '33:44:55:66:77:88', name: 'Beats Studio3', isConnected: false },
  ];

  const enableBluetooth = useCallback(async () => {
    if (Platform.OS === 'web') {
      setIsEnabled(true);
      return;
    }

    try {
      // In a real implementation, this would enable Bluetooth
      setIsEnabled(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to enable Bluetooth');
    }
  }, []);

  const startScanning = useCallback(async () => {
    setIsScanning(true);
    setAvailableDevices([]);

    // Simulate scanning process
    setTimeout(() => {
      const shuffled = [...mockDevices].sort(() => 0.5 - Math.random());
      const randomDevices = shuffled.slice(0, Math.floor(Math.random() * 4) + 1);
      setAvailableDevices(randomDevices);
      setIsScanning(false);
    }, 2000);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const connectToDevice = useCallback(async (device: BluetoothDevice) => {
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectedDevice(device);
      setIsConnected(true);
      
      // Remove from available devices
      setAvailableDevices(prev => prev.filter(d => d.id !== device.id));
      
      Alert.alert('Connected', `Successfully connected to ${device.name || 'device'}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to device');
    }
  }, []);

  const disconnectDevice = useCallback(async () => {
    if (!connectedDevice) return;

    try {
      // Simulate disconnection process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const device = connectedDevice;
      setConnectedDevice(null);
      setIsConnected(false);
      
      // Add back to available devices if scanning
      if (isScanning) {
        setAvailableDevices(prev => [...prev, device]);
      }
      
      Alert.alert('Disconnected', `Disconnected from ${device.name || 'device'}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to disconnect from device');
    }
  }, [connectedDevice, isScanning]);

  // Initialize Bluetooth state
  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsEnabled(true);
    } else {
      // In a real implementation, check actual Bluetooth state
      setIsEnabled(true);
    }
  }, []);

  const value: BluetoothContextType = {
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
  };

  return (
    <BluetoothContext.Provider value={value}>
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetoothContext() {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error('useBluetoothContext must be used within a BluetoothProvider');
  }
  return context;
}