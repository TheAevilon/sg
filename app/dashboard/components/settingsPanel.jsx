'use client'

import { useState } from "react";
import { useSettings } from "./settingsContext";
import { URL, images } from "./picutreSource";
import Image from "next/image";


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
    toggle,
    source,
    changeSource,
    pictureURL,
    changePicture,
    bgColor,
    changeColor
  } = useSettings();

  const [studyTime, setStudyTime] = useState(time);
  const [breakTime, setBreakTime] = useState(sessionBreak);
  const [mode, setMode] = useState("background")

  const colors = [
    '#000',
    '#232a2e',
    '#1a1b26',
    '#24283b',
    '#2e3440',
    '#3b4252',
    '#1e1e2e',
    '#282c34',
  ];


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
    <div className={`text-white flex justify-center items-center flex-col bg-black w-max h-max ${!toggle && 'hidden'}`}>
      <div>
        <span onClick={() => setMode('background')} className={mode === 'background' ? 'text-white font-bold' : 'text-slate-600'} >background</span>
        <span onClick={() => setMode('time')} className={mode === 'time' ? 'text-white font-bold' : 'text-slate-600'}>Time</span>
      </div>
      <div className={`flex flex-col ${mode === "background" ? 'block' : 'hidden'}`} >
        <span onClick={() => changeSource('picture')} className={source === 'picture' ? 'text-white font-bold' : 'text-slate-600'} >Picture</span>
        <span onClick={() => changeSource('youtube')} className={source === 'youtube' ? 'text-white font-bold' : 'text-slate-600'} >YouTube</span>
        <span onClick={() => changeSource('color')} className={source === 'color' ? 'text-white font-bold' : 'text-slate-600'} >Color</span>

        {source === 'picture' && (<>
          <div className="flex">
            {images.map(i => (<Image key={i} className={pictureURL === URL(i) ? 'border border-white' : ""} onClick={() => changePicture(URL(i))} src={URL(i)} width={100} height={100} alt={i} />))}
          </div>
        </>)

        }
        {source === 'color' && (<>
          <div className="flex">
            {colors.map(i => (<div key={i} className={bgColor === i ? 'border border-white' : ""} onClick={() => changeColor(i)} style={{ background: i, width: 30, height: 30 }} ></div>))}
          </div>
        </>)

        }

        {source === 'youtube' && (<> <button onClick={toggleAudio}>{audio ? 'Mute' : 'Unmute'}</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
          />

          <p>Now Playing: {video}</p>

          <button onClick={() => {
            const videoId = prompt("Enter YouTube video ID:", video);
            if (videoId && videoId.trim() !== "") {
              changeVideo(videoId.trim());
            }
          }}
            type="">change video</button> </>)}
      </div>
      <div className={`flex flex-col ${mode === "time" ? 'block' : 'hidden'}`} >
        <label htmlFor="time">Study time duration in Minutes</label>
        <input id='time' type="number" onChange={handleChange} name="time" value={studyTime / 60}></input>
        <label htmlFor="break">Break Duration in minutes</label>
        <input id='break' type="number" onChange={handleChange} name="break" value={breakTime / 60}></input>
        {time != studyTime || sessionBreak != breakTime ? <button onClick={() => changeTime(parseInt(studyTime)) && changeBreak(parseInt(breakTime))} > save changes </button> : false}
      </div>
    </div>
  </>)
}

export default settingsPanel
