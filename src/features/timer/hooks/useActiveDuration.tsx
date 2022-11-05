import { useSelector } from '@xstate/react';
import {
  selectIsTimerPending,
  selectIsTimerRunning,
  selectTimerContext,
} from 'features/timer/machines/TimerMachine';
import { useTimerService } from 'features/timer/machines/TimerMachineProvider';
import { useRef } from 'react';

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
  } else if (isPending) {
    return durationRef.current;
  }
  return initialDuration;
}
