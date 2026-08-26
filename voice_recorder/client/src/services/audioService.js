import api from './api';

export const audioService = {
  // Upload audio file
  uploadAudio: async (audioFile, metadata = {}) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await api.post('/audio/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all audio files
  getAllAudio: async () => {
    const response = await api.get('/audio');
    const data = response.data;
    console.log(`audio data: `, data);
    return data;
  },

  // Get single audio file
  getAudio: async (id) => {
    const response = await api.get(`/audio/${id}`);
    return response.data;
  },

  // Delete audio file
  deleteAudio: async (id) => {
    const response = await api.delete(`/audio/${id}`);
    return response.data;
  },

  // Download audio file
  downloadAudio: async (filename) => {
    const response = await api.get(`/audio/download/${filename}`, {
      responseType: 'blob',
    });
    return response;
  },
};