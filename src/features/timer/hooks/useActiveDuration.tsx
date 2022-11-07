import { useSelector } from '@xstate/react';
import React, { useRef } from 'react';
import {
  selectTimerContext,
  selectIsTimerRunning,
  selectIsTimerPending,
} from '../machines/TimerMachine';
import {
  TimerContext,
  useTimerService,
} from '../providers/TimerMachineProvider';

export function useActiveDuration(initialDuration: number): number {
  const service = useTimerService();
  const { duration } = useSelector(service, selectTimerContext);
  const isRunning = useSelector(service, selectIsTimerRunning);
  const isPending = useSelector(service, selectIsTimerPending);
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
