import React, { useState, useEffect } from 'react';
import { FaDownload, FaTrash, FaSpinner } from 'react-icons/fa';
import { audioService } from '../../services/audioService';
import { AudioPlayer } from '../AudioPlayer';
import styles from './AudioList.module.css';

export const AudioList = ({ refreshTrigger }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchAudioFiles = async () => {
    try {
      setLoading(true);
      const response = await audioService.getAllAudio();
      setAudioFiles(response.files);
      setError(null);
    } catch (err) {
      setError('Failed to load audio files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, [refreshTrigger]);

  const handleDownload = async (file) => {
    try {
      setDownloadingId(file.id);
      const response = await audioService.downloadAudio(file.filename);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originalName || file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download file');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      try {
        await audioService.deleteAudio(id);
        await fetchAudioFiles();
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete file');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
        Loading recordings...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Recordings</h2>
      {audioFiles.length === 0 ? (
        <div className={styles.empty}>
          No recordings yet. Start by recording your voice!
        </div>
      ) : (
        <div className={styles.list}>
          {audioFiles.map((file) => (
            <div key={file.id} className={styles.audioItem}>
              <div className={styles.audioInfo}>
                <div className={styles.fileName}>
                  {file.metadata?.name || file.originalName || file.filename}
                </div>
                <div className={styles.fileMeta}>
                  Size: {file.size} • Date: {new Date(file.uploadDate).toLocaleString()}
                </div>
              </div>
              <div className={styles.audioPlayer}>
                <AudioPlayer src={file.url ?? `/uploads/${file.filename}`} />
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownload(file)}
                  disabled={downloadingId === file.id}
                >
                  {downloadingId === file.id ? <FaSpinner className={styles.spinner} /> : <FaDownload />}
                  Download
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(file.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};