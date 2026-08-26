import { FILE_CONFIG } from '../constants/config';

export const validateAudioFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (!FILE_CONFIG.allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type' };
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > FILE_CONFIG.maxSizeMB) {
    return { isValid: false, error: `File too large. Max size: ${FILE_CONFIG.maxSizeMB}MB` };
  }

  return { isValid: true, error: null };
};