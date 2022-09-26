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
      payload: ActiveTimeEntry
    }
  | {
      type: 'STOP'
    }

function getActiveTimeEntryDuration(activeTimeEntry: ActiveTimeEntry): number {
  return activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
}

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdKiANmAMQDKAKgIIBK5ioADgPayppMB29IAHogJwB2HABYATGJEBWQQDZBU2SIDMABikAaEAE9EARhEicUgBxDlI2Sb2qVJkQF8HWtJlz4ixAMIB5AHLkAJJ+AKoAotzMrOxcSLwCwuKSMvKKKupaughiasYierKyqkWCcvxSTi4Y2DhYAK4cHKgcUMRBXgDSkSxsqJzcfNnWOOpSYibKsmLlSlIimfp6-Dh6JtN6imKqqnrKgmKVIK419Y3NrRQ+AArd0X2xoIN6YrI4shayNmuq-FZTCwhTG89iZVCYFCpVjlZE5nCAOEwIHBuMd3IQwLdev04oMALRLN6gsY7MGyfj8EwmAEbKTGQQbfIbSb2QSHVG1BpNFqYmIDRCSPQ4ZQSLZiKRqWRSHaCAFiGwrCz2BnyZT8ZQVOGonn3PkIXEqQnqLZfMkUqk6RD45RCqUiExk5SUyyTGGwoA */
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
              duration: (_, { payload }) => getActiveTimeEntryDuration(payload),
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
