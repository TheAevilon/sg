import { useState } from "react";
import { useSettings } from "./settingsContext";
const settingsPanel = () => {

  const {
    audio,
    toggleAudio,
    volume,
    changeVolume,
    video,
    changeVideo,
    sessionBreak,
    changeBreak,
    changeTime,
    time,
    toggle
  } = useSettings();

  const [studyTime, setStudyTime] = useState(time);
  const [breakTime, setBreakTime] = useState(sessionBreak);

  const handleChange = (e) => {
    let value = e.target.value
    let type = e.target.name
    if (type === 'time') {
      value && setStudyTime(value * 60);
    }

    if (type === 'break') {
      setBreakTime(value * 60)
    }
  }

  return (<>
    <div className={`text-white bg-black w-[40vw] h-[60vh] ${!toggle && 'hidden'}`}>
      <button onClick={toggleAudio}>{audio ? 'Mute' : 'Unmute'}</button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
      />

      <p>Now Playing: {video}</p>

      <button onClick={() => changeVideo(prompt("video id", video) ? true : video)} type="">change video</button>
      <div className="flex flex-col">
        <label htmlFor="time">Study time duration in Minutes</label>
        <input id='time' type="number" onChange={handleChange} name="time" value={studyTime / 60}></input>
        <label htmlFor="break">Break Duration in minutes</label>
        <input id='break' type="number" onChange={handleChange} name="break" value={breakTime / 60}></input>
      </div>
      {time != studyTime || sessionBreak != breakTime ? <button onClick={() => changeTime(parseInt(studyTime)) && changeBreak(parseInt(breakTime))} > save changes </button> : false}
    </div>
  </>)
}

export default settingsPanel
