'use client'

import { useState } from "react";
import { useSettings } from "./settingsContext";
import { URL, images } from "./picutreSource";
import Image from "next/image";
import dynamic from "next/dynamic";

const BandcampEmbed = dynamic(() => import('./music'), { ssr: false });

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
  const updateClock = () => {
    if (studyTime < 1 || breakTime < 1) {
      alert(studyTime > 0 ? 'atleast rest for a minute' : 'why are you even here?');
      return false;
    }
    if (breakTime > studyTime / 5) {
      if (confirm("so break time is too much compared to studyTime do you really want to do that?") == true) {

        changeTime(parseInt(studyTime));
        changeBreak(parseInt(breakTime));
      }
    }

    changeTime(parseInt(studyTime));
    changeBreak(parseInt(breakTime));
  }

  return (<>

    <div
      className="text-white flex justify-center items-center flex-col p-3 bg-[var(--background)] w-[350px] h-max"
      style={{ display: toggle ? 'flex' : 'none' }}
    >
      <div className="w-max flex gap-3" >
        <span onClick={() => setMode('background')} className={mode === 'background' ? 'cursor-pointer text-white font-bold' : 'text-slate-600 cursor-pointer'} >background</span>
        <span onClick={() => setMode('time')} className={mode === 'time' ? 'text-white cursor-pointer font-bold' : 'text-slate-600 cursor-pointer'}>Time</span>
        <span onClick={() => setMode('music')} className={mode === 'music' ? 'text-white cursor-pointer font-bold' : 'text-slate-600 cursor-pointer'}>Music</span>
      </div>

      <div className="flex ">


        <div className="flex flex-col" style={{ display: mode === "music" ? 'flex' : 'none' }}>
          {source === 'youtube' ? "thus us youtube video so you can adjust volume in background section" : (<BandcampEmbed />)}
        </div>

        <div className={`flex ${mode === "background" ? 'block' : 'hidden'}`} >

          <div className="flex relative left-0 flex-col">
            <span onClick={() => changeSource('picture')} className={source === 'picture' ? 'w-max cursor-pointer text-white font-bold' : 'text-slate-600 cursor-pointer w-max'} >Picture</span>
            <span onClick={() => changeSource('youtube')} className={source === 'youtube' ? 'w-max cursor-pointer text-white font-bold' : 'text-slate-600 cursor-pointer w-max '} >YouTube</span>
            <span onClick={() => changeSource('color')} className={source === 'color' ? 'w-max cursor-pointer text-white font-bold' : 'text-slate-600 cursor-pointer w-max'} >Color</span>
          </div>


          {source === 'picture' && (<>
            <div className="flex w-[260px] h-auto flex-wrap gap-2 p-2 ">
              {images.map(i => (<Image key={i} className={pictureURL === URL(i) ? 'cursor-pointer border border-white' : " cursor-pointer"} onClick={() => changePicture(URL(i))} src={URL(i)} width={100} height={100} alt={i} />))}
            </div>
          </>)
          }
          {source === 'color' && (<>
            <div className="flex w-[260px]">
              {colors.map(i => (<div key={i} className={bgColor === i ? 'border border-white cursor-pointer' : "cursor-pointer"} onClick={() => changeColor(i)} style={{ background: i, width: 30, height: 30 }} ></div>))}
            </div>
          </>)

          }

          {source === 'youtube' && (<>
            <div className="flex flex-col w-[260px] h-auto  p-2 ">
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

              <button onClick={() => {
                const videoId = prompt("Enter YouTube video ID:", video);
                if (videoId && videoId.trim() !== "") {
                  changeVideo(videoId.trim());
                }
              }}
                type="">change video</button>
            </div>
          </>)}

        </div>
        <div className={`flex flex-col ${mode === "time" ? 'block' : 'hidden'}`} >
          <label htmlFor="time">Study time duration in Minutes</label>
          <input id='time' type="number" onChange={handleChange} name="time" value={studyTime / 60}></input>
          <label htmlFor="break">Break Duration in minutes</label>
          <input id='break' type="number" onChange={handleChange} name="break" value={breakTime / 60}></input>
          {time != studyTime || sessionBreak != breakTime ? <button onClick={() => updateClock()} > save changes </button> : false}
        </div>
      </div>
    </div>
  </>)
}

export default settingsPanel
