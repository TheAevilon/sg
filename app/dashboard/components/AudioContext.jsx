'use client';

import { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [audio, setAudio] = useState(false); // false = muted

  const toggleAudio = () => setAudio(prev => !prev);

  return (
    <AudioContext.Provider value={{ audio, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
