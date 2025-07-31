'use client';
import { useSettings } from './settingsContext';

export function ToggleAudio() {
  const { audio, toggleAudio, changeToggle } = useSettings();

  return (
    <>
      <button onClick={toggleAudio} className="z-50 fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded">
        {audio ? '🔈' : '🔇'}
      </button>
      <button onClick={changeToggle} className="z-50 fixed bottom-4 left-40 bg-black text-white px-4 py-2 rounded">
        {'🔧'}
      </button>
    </>
  );
}
