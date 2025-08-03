'use client';
import { useSettings } from './settingsContext';

export function ToggleAudio() {
  const { changeToggle, toggle } = useSettings();

  return (
    <>
      <button onClick={changeToggle} className="z-50 fixed bottom-4 left-2 bg-black text-white px-4 py-2 rounded">
        {!toggle ? '🔧' : 'X'}
      </button>
    </>
  );
}
