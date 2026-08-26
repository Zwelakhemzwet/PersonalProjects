export const API_BASE_URL = '/api';

export const AUDIO_CONFIG = {
  mimeType: 'audio/webm',
  audioBitsPerSecond: 128000,
  maxDuration: 300, // 5 minutes max
};

export const FILE_CONFIG = {
  maxSizeMB: 10,
  allowedTypes: ['audio/webm', 'audio/mpeg', 'audio/wav'],
};