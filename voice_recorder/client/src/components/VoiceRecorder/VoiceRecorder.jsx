import React, { useState } from 'react';
import { FaMicrophone, FaStop, FaUpload, FaTrash } from 'react-icons/fa';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { useAudioUpload } from '../../hooks/useAudioUpload';
import { formatTime } from '../../utils/formatTime';
import styles from './VoiceRecorder.module.css';

export const VoiceRecorder = ({ onUploadSuccess }) => {
  const [recordingName, setRecordingName] = useState('');
  const {
    isRecording,
    recordingTime,
    audioBlob,
    error: recorderError,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();
  
  const {
    isUploading,
    uploadProgress,
    uploadError,
    uploadAudio,
  } = useAudioUpload();

  const handleUpload = async () => {
    if (!audioBlob) return;
    
    const result = await uploadAudio(audioBlob, {
      name: recordingName || `Recording_${new Date().toLocaleString()}`,
      date: new Date().toISOString(),
    });
    
    if (result && onUploadSuccess) {
      onUploadSuccess();
      resetRecording();
      setRecordingName('');
    }
  };

  const handleDiscard = () => {
    resetRecording();
    setRecordingName('');
  };

  return (
    <div className={styles.recorderContainer}>
      <div className={styles.recorderCard}>
        <h2 className={styles.title}>Voice Recorder</h2>
        
        <div className={styles.timerSection}>
          <div className={styles.timer}>
            {formatTime(recordingTime)}
          </div>
          {isRecording && (
            <div className={styles.recordingIndicator}>
              <span className={styles.redDot}></span>
              Recording...
            </div>
          )}
        </div>

        <div className={styles.controls}>
          {!isRecording && !audioBlob && (
            <button
              className={`${styles.button} ${styles.recordButton}`}
              onClick={startRecording}
              disabled={isUploading}
            >
              <FaMicrophone /> Start Recording
            </button>
          )}
          
          {isRecording && (
            <button
              className={`${styles.button} ${styles.stopButton}`}
              onClick={stopRecording}
            >
              <FaStop /> Stop Recording
            </button>
          )}
          
          {audioBlob && !isRecording && (
            <>
              <input
                type="text"
                className={styles.nameInput}
                placeholder="Recording name (optional)"
                value={recordingName}
                onChange={(e) => setRecordingName(e.target.value)}
              />
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.button} ${styles.uploadButton}`}
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  <FaUpload /> {isUploading ? `Uploading ${uploadProgress}%` : 'Upload'}
                </button>
                <button
                  className={`${styles.button} ${styles.discardButton}`}
                  onClick={handleDiscard}
                  disabled={isUploading}
                >
                  <FaTrash /> Discard
                </button>
              </div>
            </>
          )}
        </div>

        {isUploading && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {(recorderError || uploadError) && (
          <div className={styles.error}>
            {recorderError || uploadError}
          </div>
        )}
      </div>
    </div>
  );
};