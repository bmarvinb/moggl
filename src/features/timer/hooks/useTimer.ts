import { useActor, useSelector } from '@xstate/react';
import {
  TimerMode,
  TimerPayload,
  TimerState,
  UpdateTimeEntryData,
} from 'features/timer/machines/TimerMachine';
import { useTimerService } from 'features/timer/machines/TimerMachineProvider';

// TODO: just an example
export function useTimer() {
  const service = useTimerService();
  const [state, send] = useActor(service);
  const mode = useSelector(service, state => state.context.mode);
  const duration = useSelector(service, state => state.context.duration);
  const timeEntry = useSelector(service, state => state.context.timeEntry);

  const idle = state.matches(TimerState.Idle);
  const running = !idle;
  const pending =
    state.matches(TimerState.Creating) ||
    state.matches(TimerState.Discarding) ||
    state.matches(TimerState.Saving);

  const data = {
    mode,
    duration,
    timeEntry,
    running,
    pending,
  };

  const api = {
    start: (start: Date) => send({ type: 'START', start }),
    stop: () => send({ type: 'STOP' }),
    continue: (data: TimerPayload) => send({ type: 'CONTINUE', data }),
    resume: (data: TimerPayload) => send({ type: 'RESUME', data }),
    discard: () => send({ type: 'DISCARD' }),
    updateTimeEntry: (data: UpdateTimeEntryData) =>
      send({ type: 'UPDATE_TIME_ENTRY', data }),
    saveTimeEntry: () => send({ type: 'SAVE_TIME_ENTRY' }),
    updateMode: (mode: TimerMode) => send({ type: 'UPDATE_MODE', mode }),
  };

  return { data, api };
}
