'use client';
import { useAudio } from './AudioContext';

export function ToggleAudio() {
  const { audio, toggleAudio } = useAudio();

  return (
    <button onClick={toggleAudio} className="z-50 fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded">
      {audio ? '🔈 Unmute' : '🔇 Mute'}
    </button>
  );
}
