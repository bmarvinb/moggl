import { useSelector } from '@xstate/react';
import React, { useRef } from 'react';
import {
  selectTimerContext,
  selectIsTimerRunning,
  selectIsTimerPending,
} from '../machines/TimerMachine';
import { TimerContext } from '../machines/TimerMachineProvider';

export function useActiveDuration(initialDuration: number): number {
  const service = React.useContext(TimerContext);
  const { duration } = useSelector(service, selectTimerContext);
  const isRunning = useSelector(service, selectIsTimerRunning);
  const isPending = useSelector(service, selectIsTimerPending);
  const durationRef = useRef(initialDuration);

  if (isRunning) {
    const updatedTime = initialDuration + duration;
    durationRef.current = updatedTime;
    return updatedTime;
  } else if (isPending) {
    return durationRef.current;
  }
  return initialDuration;
}
