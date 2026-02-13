import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer(initialSeconds, onTimeUp) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);

  // Update onTimeUpRef when onTimeUp changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Timer interval — only depends on isRunning
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          onTimeUpRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newTime) => {
      setIsRunning(false);
      setTimeRemaining(newTime ?? initialSeconds);
    },
    [initialSeconds],
  );

  const setTime = useCallback((time) => {
    setTimeRemaining(time);
  }, []);

  return { timeRemaining, isRunning, start, pause, reset, setTime };
}
