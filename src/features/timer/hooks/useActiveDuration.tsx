import { useSelector } from '@xstate/react';
import { useRef } from 'react';
import {
  isTimerPending,
  isTimerRunning,
  selectTimerDuration,
  useTimerService,
} from '../machines/timerMachine';

export function useActiveDuration(initialDuration: number): number {
  const service = useTimerService();
  const duration = useSelector(service, selectTimerDuration);
  const isRunning = useSelector(service, isTimerRunning);
  const isPending = useSelector(service, isTimerPending);
  const durationRef = useRef(initialDuration);

  if (isRunning) {
    const updatedTime = initialDuration + duration;
    durationRef.current = updatedTime;
    return updatedTime;
  }
  if (isPending) {
    return durationRef.current;
  }
  return initialDuration;
}
