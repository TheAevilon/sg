'use client';

import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [audio, setAudio] = useState(false);
  const [volume, setVolume] = useState(50); // 0–100
  const [video, setVideo] = useState("hxkuVG2GmSM");
  const [time, setTime] = useState(1500)
  const [sessionBreak, setBreak] = useState(300)
  const [toggle, setToggle] = useState(false)
  const [source, setSource] = useState("picture")
  const [pictureURL, setPictureURL] = useState('https://raw.githubusercontent.com/D3Ext/aesthetic-wallpapers/main/images/chill.gif')

  const toggleAudio = () => setAudio(prev => !prev);

  const changeVolume = (v) => {
    const clamped = Math.max(0, Math.min(100, v));
    setVolume(clamped);
  };

  const changeVideo = (vId) => setVideo(vId);
  const changeTime = (duration) => setTime(duration);
  const changeBreak = (duration) => setBreak(duration)
  const changeSource = (source) => setSource(source)
  const changePicture = (source) => setPictureURL(source)
  const changeToggle = () => setToggle(!toggle)

  return (
    <SettingsContext.Provider value={{
      audio,
      toggleAudio,
      volume,
      changeVolume,
      video,
      changeVideo,
      time,
      changeTime,
      sessionBreak,
      changeBreak,
      toggle,
      changeToggle,
      source,
      changeSource,
      pictureURL,
      changePicture
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
