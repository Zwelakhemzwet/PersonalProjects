import React, { useState } from 'react';
import { VoiceRecorder } from './components/VoiceRecorder';
import { AudioList } from './components/AudioList';
import styles from './App.module.css';

function App() {
  const [refreshList, setRefreshList] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Voice Recorder Pro</h1>
        <p>Record, upload, and manage your voice recordings</p>
      </header>
      <main className={styles.main}>
        <VoiceRecorder onUploadSuccess={handleUploadSuccess} />
        <AudioList refreshTrigger={refreshList} />
      </main>
    </div>
  );
}

export default App;