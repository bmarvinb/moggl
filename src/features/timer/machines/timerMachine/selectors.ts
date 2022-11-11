import { State } from 'xstate';
import { Events, Context, TimerMode, TimeEntryData } from './types';

export function isTimerRunning(state: State<Context, Events>): boolean {
  return !state.matches('idle');
}

export function isTimerPending(state: State<Context, Events>): boolean {
  return (
    state.matches('creating') ||
    state.matches('discarding') ||
    state.matches('saving')
  );
}

export function selectTimeEntry(state: State<Context, Events>): TimeEntryData {
  return state.context.timeEntry;
}

export function selectTimerMode(state: State<Context, Events>): TimerMode {
  return state.context.mode;
}

export function selectTimerDuration(state: State<Context, Events>): number {
  return state.context.duration;
}
