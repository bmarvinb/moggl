import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { assign, createMachine } from 'xstate'

export type TimerContext = {
  duration: number
}

type TimerEvent =
  | {
      type: 'TICK'
    }
  | {
      type: 'START'
    }
  | {
      type: 'CONTINUE'
      activeTimeEntry: ActiveTimeEntry
    }
  | {
      type: 'STOP'
    }

function getActiveTimeEntryDuration(activeTimeEntry: ActiveTimeEntry): number {
  return activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
}

export const timerMachine = createMachine<TimerContext, TimerEvent>({
  id: 'timer',
  initial: 'stopped',
  context: {
    duration: 0,
  },
  states: {
    stopped: {
      on: {
        START: {
          target: 'running',
          actions: assign({
            duration: 0,
          }),
        },
        CONTINUE: {
          target: 'running',
          actions: assign({
            duration: (_, payload) =>
              getActiveTimeEntryDuration(payload.activeTimeEntry),
          }),
        },
      },
    },
    running: {
      invoke: {
        src: () => cb => {
          const interval = setInterval(() => {
            cb('TICK')
          }, 1000)
          return () => clearInterval(interval)
        },
      },
      on: {
        TICK: {
          actions: assign({
            duration: context => context.duration + 1,
          }),
        },
        STOP: {
          target: 'stopped',
          actions: assign({
            duration: 0,
          }),
        },
      },
    },
  },
})
