"use client"
import { useEffect, useReducer, useState } from "react"
const clock = () => {

  const [time, setTime] = useState(10)
  const [sessionBreak, setBreak] = useState(5)
  const [session, setSession] = useState(1)

  const initialState = {
    time: time,
    running: false,
    status: 'Time',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'tickTime': {
        return {
          ...state,
          time: state.time > 0 && state.time - 1,
          status: state.time === 0 ? 'Break' : 'Time',
          running: state.time > 1
        };
      }
      case 'tickBreak': {
        return {
          ...state,
          time: state.time > 0 && state.time - 1,
          status: state.time === 0 ? 'Time' : 'Break',
          running: state.time > 1,
        };
      }
      case 'resume':
        console.log(state.status)
        return { ...state, running: true };
      case 'finishTime': {
        setSession(session + 1)
        return {
          ...state,
          time: sessionBreak,
          running: true
        };
      }
      case 'finishBreak': {
        return {
          ...state,
          time: time,
          running: true
        };
      }
      case 'pause':
        return { ...state, running: false };
      case 'reset':
        return { ...initialState };
      default:
        return state;
    }
  }

  const [clock, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: `finish${clock.status}` })
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
      <h1 className="text-8xl fontStencil " onClick={() => dispatch({ type: clock.running ? 'pause' : 'resume' })} >{formatTime(clock.time)}</h1>
    </div>
  )
}

export default clock 
