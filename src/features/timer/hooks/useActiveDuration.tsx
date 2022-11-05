import { useActor } from '@xstate/react';
import { TimerState } from 'features/timer/machines/TimerMachine';
import { useTimerService } from 'features/timer/machines/TimerMachineProvider';
import { useRef } from 'react';

export function useActiveDuration(initialDuration: number): number {
  const service = useTimerService();
  const [state] = useActor(service);
  const durationRef = useRef(initialDuration);
  const isRunning =
    state.matches(TimerState.Creating) || state.matches(TimerState.Running);
  const isUpdating =
    state.matches(TimerState.Saving) || state.matches(TimerState.Discarding);

  if (isRunning) {
    const updatedTime = initialDuration + state.context.duration;
    durationRef.current = updatedTime;
    return updatedTime;
  } else if (isUpdating) {
    return durationRef.current;
  }
  return initialDuration;
}
