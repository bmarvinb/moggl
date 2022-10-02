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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVioADgPaypqsB2TIAHogC0ANgCcADhwAmAOxiArNOkiFYgAwBmMQEYANCACeiaWJzrZI9QBZN06xLvzNCgL6uD+bHgzeipMgBhAHkAOSoASVCAVQBRPjYOLl4kAWFZHWkcCQkFEU1HaQU8630jRB0rHB1NC1ytTR1ZG2t3T19cL1wsAFdublRuKDJIwIBpBPZOVB4+QQQhF00cWolZWQUJSQdNEQNjBB1bHDExWTWHc9z11o8QLp8CHF7+weHqYIAFSaSZlNB5kJSstztZTOoxNZ1OJrLJ9sIdGpqmcRBJTBImls3HcHuhWBAwI9sGQALLBAAisRwVGCAHFaQAZeKpRLTWapQFHKSI1HWMSaMH5FTwhBVCHqHTqdTSCFgiFiERte4dHB4gmqgCG3B6GuIpIpVJp9KZPzZ-zSCy51TyW1Km1U8j25UtClkOActnOajO2n57ju3HxcD4Dwe-jApuSc3SVREmURdmhMpEcOdQiOChwzQkEIUmiWu2UStDKpeAyGkb+0YW1jzOAUkokIhluVdImsIu0MhyEsqpxlslsxZVXUr7IB6Qk1hwcekCeTydTByE0ka1SbEtqai0Dc0w6easJo5ZUyjHIRYiylnOtXsViUDhFQOnCilWNrUNsd-33kPmu1upjuagIFNkU7SjoawbOILhPtYL5vooH42HY1iKjiKqHkB1YrpUWYpo40poeoD4SE+yhmLCKhgoO2ilPBP5YNh54LDmUizvOSbQkuwi1MsTQ0bIMp2LsKb+q4QA */
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
