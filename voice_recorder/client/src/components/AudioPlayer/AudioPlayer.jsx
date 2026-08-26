import React, { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import styles from './AudioPlayer.module.css';

export const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <button className={styles.playButton} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div className={styles.waveform}></div>
    </div>
  );
};