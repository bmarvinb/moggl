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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVioADgPaypqsB2TIAHogC0ANgCcADhwAmAOxiArNOkiFYgAwBmMQEYANCACeiaWJzrZI9QBZN06xLvzNCgL6uD+bHgzeipMgBhAHkAOSoASVCAVQBRPjYOLl4kAWFZHWkcCQkFEU1HaQU8630jRB0rHB1NC1ytTR1ZG2t3T19cL1wsAFdublRuKDJIwIBpBPZOVB4+QQQhF00cWolZWQUJSQdNEQNjBB1bHDExWTWHc9z11o8QLp8CHF7+weHqYIAFSaSZlNB5kJSstztZTAp1HIxNYRKp9sIdGpqmcRBsNpCxCoRG17h0cOhWBAwI9sGQALLBAAisRwVGCAHF6QAZeKpRLTWapQFHKSIkQSaxiTRg-IqeEIKrqDQ6dSQqVgqVibF3B4Eon4gCG3B6GuI5KpNLpjJZPw5-zSCx51TyW1Km1U8j25UtClkOActnOajO2iF7ju3EJcD4Dwe-jApuSc3SVREmURdnUImkSdk4qERwUOGaEilCk0S12yhxobxLwGQ0jf2jC2s+ZwChlEmT6lyrpE1nF2hkOXUOkqpxTslsJbxXSrnIB6QFODj0gTKZbqPT0ka1VySpsxXOBdHTzVxPHbKmUa5CMx2dRjkhMPUSgc6es1gbsq2Cjr1hsdhhe+8B812q6hO5qAgU2QCpCOhrBs4guI+z4Qq2igfl+9jKu0+5BsBNZCPOIiXjuN5WPeEgrqY7qyFiBZ3qud6aL+WDYWeCy5lIc4Lkmi5ps6ixaNUw72I2c6yAUyruEAA */
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
