import { useState } from 'react';
import { audioService } from '../services/audioService';

export const useAudioUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const uploadAudio = async (audioBlob, metadata = {}) => {
    if (!audioBlob) {
      setUploadError('No audio to upload');
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      const fileName = `recording_${Date.now()}.webm`;
      const audioFile = new File([audioBlob], fileName, { type: 'audio/webm' });
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await audioService.uploadAudio(audioFile, metadata);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
      return response;
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed');
      setIsUploading(false);
      setUploadProgress(0);
      return null;
    }
  };

  return {
    isUploading,
    uploadProgress,
    uploadError,
    uploadAudio,
  };
};