import { useSelector } from '@xstate/react';
import {
  selectIsTimerPending,
  selectIsTimerRunning,
  selectTimerContext,
} from 'features/timer/machines/TimerMachine';
import { TimerContext } from 'features/timer/machines/TimerMachineProvider';
import React, { useRef } from 'react';

export function useActiveDuration(initialDuration: number): number {
  const service =   React.useContext(TimerContext);
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
