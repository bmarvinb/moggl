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

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdKiANmAMQDKAKgIIBK5ioADgPayppMB29IAHogIwBWAJw5+ABgBMwgOxyAHABYAzIunKANCACeAmYJzDFU5fOHj5-AGzDBygL72taTLnxFiAYQDyAOXIAkr4AqgCi3Mys7FxIvAIiYlKyCipqwpo6iJJW-DhmktaK8qpmgpKOzhjYOFgArhwcqBxQxIGeANIRLGyonNx8CKqSODLKgvLiyqPy2YqKglq6CELiOHaq-MJKMvzKRhUgLtV1DU0tFN4ACl1RvTGgA-zy8jjKQrviwtJWVvILmQgzIZnm9pJY5nsHAcOEwIHBuEc3IQwDcen1YgM1IsBPIrIZJJJxPNTBYJIoDoiavVGs1UdF+ohlJMcOIpDICVZIYJWf8lpJFLkinZ5nJTFZuYIKVUsHS7gzlvJsQqWazJsIbFZpITxFZHI4gA */
  createMachine<TimerContext, TimerEvent>({
  context: { duration: 0 },
  id: 'timer',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          actions: assign({
            duration: 0,
          }),
          target: 'running',
        },
        CONTINUE: {
          actions: assign({
            duration: (_, payload) =>
              getActiveTimeEntryDuration(payload.activeTimeEntry),
          }),
          target: 'running',
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
          actions: assign({
            duration: 0,
          }),
          target: 'idle',
        },
      },
    },
  },
})
