import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { RefObject } from 'react';

export const captureAndShare = async (viewRef: RefObject<any>): Promise<void> => {
  if (!viewRef.current) return;
  
  try {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
      result: 'tmpfile'
    });
    
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Share your greeting',
      });
    } else {
      alert('Sharing not available on this device');
    }
  } catch (error) {
    console.error('Native share failed:', error);
    alert('Error sharing image.');
  }
};
