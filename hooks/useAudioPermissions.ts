import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export function useAudioPermissions() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'web') {
        // For web, we'll check when user tries to record
        setHasPermission(true);
        setIsLoading(false);
        return;
      }

      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error('Failed to request audio permissions:', error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hasPermission,
    isLoading,
    requestPermissions,
  };
}