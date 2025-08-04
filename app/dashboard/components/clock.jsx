"use client"
import { useEffect, useReducer, useState } from "react"
import { useSettings } from "./settingsContext.jsx";


const clock = () => {
  const {
    time,
    sessionBreak
  } = useSettings();
  const [session, setSession] = useState(1)

  const init = (time, initialState = {}) => ({
    time,
    initialTime: { time: time, break: sessionBreak },
    running: false,
    status: initialState.status || 'Time',
  });
  const reducer = (state, action) => {
    switch (action.type) {
      case 'tickTime': {
        return {
          ...state,
          time: state.time > 0 && state.time - 1,
          status: state.time === 0 ? 'Break' : 'Time',
          running: state.status != 0
        };
      }
      case 'tickBreak': {
        return {
          ...state,
          time: state.time > 0 && state.time - 1,
          status: state.time === 0 ? 'Time' : 'Break',
          running: state.time != 0,
        };
      }
      case 'resume':
        return { ...state, running: true };
      case 'startBreak': {
        setSession(session + 1)
        return {
          ...state,
          time: sessionBreak,
          running: false
        };
      }
      case 'startTime': {
        return {
          ...state,
          time: time,
          running: false
        };
      }
      case 'pause':
        return { ...state, running: false };
      case 'reset':
        return init((state.status === 'Time' ? time : sessionBreak), state)
      default:
        return state;
    }
  }

  const [clock, dispatch] = useReducer(reducer, time, init)

  useEffect(() => {
    if (clock.time == 0) {
      dispatch({ type: `start${clock.status}` })
    }
  }, [clock.status])


  useEffect(() => {
    let interval;
    if (clock.running) {
      interval = setInterval(() => {
        dispatch({ type: `tick${clock.status}` });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clock.running]);
  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1 className="text-8xl cursor-pointer fontStencil " onClick={() => dispatch({ type: clock.running ? 'pause' : 'resume' })} >{formatTime(clock.time)}</h1>
      <h2 className="text-2xl fontStencil ">{clock.status === 'Time' ? 'studing' : 'on break'}, session :  {session}</h2>
      {(clock.initialTime.time !== time || clock.initialTime.break !== sessionBreak) && (<button onClick={() => dispatch({ type: 'reset' })} type="">change your clock to the saved settings?</button>)}
    </div>
  )
}

export default clock 
