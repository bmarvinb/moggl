import { assertNever } from 'common/utils/assert';
import { TimerStatus } from 'features/timer/models/timer-status';
import { useTimer } from 'features/timer/providers/TimerProvider';
import { useRef } from 'react';

export function useActiveDuration(initialDuration: number): number {
  const timer = useTimer();
  const status = timer.status;
  const durationRef = useRef(initialDuration);
  switch (status) {
    case TimerStatus.Idle:
      return initialDuration;
    case TimerStatus.Running:
      const updatedTime = initialDuration + timer.duration;
      durationRef.current = updatedTime;
      return updatedTime;
    case TimerStatus.Saving:
      return durationRef.current;
    default:
      return assertNever(status);
  }
}
