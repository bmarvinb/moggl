import { useActor } from '@xstate/react';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { useRef } from 'react';

export function useActiveDuration(initialDuration: number): number {
  const service = useTimerMachine();
  const [state] = useActor(service);
  const durationRef = useRef(initialDuration);
  if (state.matches('creating') || state.matches('running')) {
    const updatedTime = initialDuration + state.context.duration;
    durationRef.current = updatedTime;
    return updatedTime;
  } else if (state.matches('saving') || state.matches('discarding')) {
    return durationRef.current;
  }
  return initialDuration;
}
