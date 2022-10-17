import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isStopwatchActive, setIsStopwatchActive] = useState<boolean>(false);

  function toggleStopwatch(): void {
    setIsStopwatchActive(!isStopwatchActive);
  }

  function resetStopwtach(): void {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsStopwatchActive(false);
  }

  useEffect(() => {
    let interval: any = null;
    if (isStopwatchActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours((hours) => hours + 1);
          setMinutes(0);
        }
      }, 1000);
    } else if (!isStopwatchActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStopwatchActive, seconds]);

  return (
    <div>
      <div>
        {hours}h {minutes}m {seconds}s
      </div>
      <div>
        <button onClick={toggleStopwatch}>
          {isStopwatchActive ? "Pause" : "Start"}
        </button>
        <button onClick={resetStopwtach}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
