import React, { useEffect, useState } from 'react';

const baseTime = 0;

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(baseTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isInterval, setIsInterval] = useState(false);
  const [timeInput, setTimeInput] = useState(baseTime)
  const [intervalInput, setIntervalInput] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState(0);

  const totalSeconds = timeInput * 60;
  const intervalSeconds = intervalInput * 60;

  useEffect(() => {
    let meditationTimer = null;
    if (isRunning) {
      meditationTimer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        if (minutes === 0 && hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
        }
      }, 1000);
    }


    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(meditationTimer)
    }

    if (seconds === 0 && minutes === 0 && hours === 0 && isRunning === true) {
      console.log("finalBells");
      clearInterval(meditationTimer)
      setIsRunning(false);
    }
    // else if (!isRunning && seconds !== 0) {
    //   clearInterval(interval);
    // }
    return () => {
      clearInterval(meditationTimer);
    }

  }, [isRunning, seconds, isInterval]);

  useEffect(() => {
    let intervalBellTimer = null;
    if (isInterval) {
      intervalBellTimer = setInterval(() => {
        console.log("single bell")
      }, intervalSeconds * 1000);
    }
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(intervalBellTimer)
      setIsInterval(false);
    }
    return () => {
      clearInterval(intervalBellTimer);
    }
  }, [isInterval])


  const handleStartPress = () => {
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
    if (intervalInput !== 0) {
      setIntervalTimer(intervalSeconds);
      console.log(intervalTimer)
      setIsInterval(true)
    }
    setIsRunning(true);
  };

  return (
    <>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={timeInput}
            onChange={(event) => setTimeInput(event.target.value)}
          />
        </label>
        Interval Bell every:
        <label>
          <input
            type="number"
            value={intervalInput}
            onChange={(event) => setIntervalInput(event.target.value)}
          />
        </label>
      </div>

      <div>
        <button onClick={handleStartPress}>Start Timer</button>
        <p>{hours}:{minutes}:{seconds}</p>
      </div>
    </>
  );
}

export default App
