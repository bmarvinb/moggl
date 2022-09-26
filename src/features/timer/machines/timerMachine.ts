import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { assign, createMachine } from 'xstate'

export enum TimerMode {
  Timer = 'Timer',
  Manual = 'Manual',
}

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
  | {
      type: 'MODE.TOGGLE'
    }

function getActiveTimeEntryDuration(activeTimeEntry: ActiveTimeEntry): number {
  return activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
}

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVioADgPaypqsB2TIAHogC0ANgCcADhwAmAOxiArNOkiFYgAwBmMQEYANCACeiaWJzrZI9QBZN06xLvzNCgL6uD+bHgzeipMgBhAHkAOSoASVCAVQBRPjYOLl4kAWFZHWkcCQkFEU1HaQU8630jRB0rHB1NC1ytTR1ZG2t3T19cL1wsAFdublRuKDJIwIBpBPZOVB4+QQQhF00cWolZWQUJSQdNEQNjBB1bHDExWTWHc9z11o8QLp8CHF7+weHqYIAFSaSZlNB5kJSstztZTAp1HIxNYRKp9sIdGpqmcRBsNpCxCoRG17h0cOhWBAwI9sGQALLBAAisRwVGCAHF6QAZeKpRLTWapQE1EQyHQSHQaaw2DIwiTwhCbHDC6Q1azWRQK8SKHEPAlE-EAQ24PU1xHJVJpdMZLJ+HP+aQWPL5EmkLmUFmFNglQkRZiadvljV2+TEmncd24hLgfAeD38YDNyTm6SqIkyiLs6hE0mTshdRwUOGaEnUik0S12ylVeIeLwGQyjfxjC2sCmWCh06gkKebxUs1gl2hkOXUOkqp1TslsJaeXSrnIB6Qk1hw8dl9dTrdRLrtOmquWhGhc8pho+86uJ47ZU2jXIRueypiaNWbcr25VrvP5OXjlXkqKK+9wh61Or1E4WoCKgnHWRZ+mIqhHDCLowhur79qikGyF+dxqsGgE1kIqazraugZKs96ro01RWCITrJrauTSN+mHngsuZSPOiZLku6aPosWjVMOyh2qmaiqAGrhAA */
  createMachine<TimerContext, TimerEvent>({
  context: { duration: 0 },
  id: 'timer',
  initial: 'idle',
  type: 'parallel',
  states: {
    timer: {
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
                duration: (_, { payload }) =>
                  getActiveTimeEntryDuration(payload),
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
    },
    mode: {
      initial: 'timer',
      states: {
        timer: {
          on: {
            'MODE.TOGGLE': {
              target: 'manual',
            },
          },
        },
        manual: {
          on: {
            'MODE.TOGGLE': {
              target: 'timer',
            },
          },
        },
      },
    },
  },
})
