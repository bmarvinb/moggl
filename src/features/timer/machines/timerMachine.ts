import { differenceInSeconds } from 'date-fns';
import { ActiveTimeEntry } from 'features/timer/models/time-entries';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { assign, createMachine } from 'xstate';

export const enum TimerMode {
  Timer = 'Timer',
  Manual = 'Manual',
}

export type TimerContext = {
  start: O.Option<Date>;
  timeEntry: O.Option<ActiveTimeEntry>;
  duration: number;
};

type TimerEvent =
  | {
      type: 'TICK';
    }
  | {
      type: 'START';
      payload: Date;
    }
  | {
      type: 'CONTINUE';
      payload: Date;
    }
  | {
      type: 'STOP';
    }
  | {
      type: 'MODE.TOGGLE';
    };

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVA2gAwC6ioADgPayprcAdhxAAPRAEYA7BJzMpAViUA2ZVIAsAZmYAmHQBoQAT0Q6FmnDs0AOTToCcyq800Lm6gL4fD+bHgx+RKRkAMIA8gByVACSEQCqAKIs7EggPHwCwqniCNKy8koKqhraeoYmCK46OApW6ioSEsr2SlJePgG4vrhYAK6CgqiCUGQxIQDSySLp-KhCIjmamvZyUprKEjZa9fbu5ZIbOOrM1jqnds3q9hI67SDd-gQ4fQNDI9RhAApTqTOZC5J7FI5NZ1Bp1MoFOozDZ9rlzDgWnYXMpNFpwco7g90NwIGBHtgyABZMIAEQSOCoYQA4tSADJJNjTXizebZA7WGoOezLWotRRSOEbdQ4KSQtYuWpLaFYzo4HF4+UAQ0EvSVxGJZIpVNpDJ+XBZ-3ZuWUnL5PJaDgUArhRWqUmstTF1maVjFXm8IEEuLgIgeDyCYGZGTmWVAOSkBmMkhdOEdzCc1nsji02janv9cpeg2GwdZYbEiE0N0Rtgk6grSjR1gkcJ0kJwzTRJ2LRWYQNlT26eaN4dM6iFIqBqmYEhrMmskc0nb8Cvx3d+htDAIQkdtzRwjXMtQrQPM6Y6TznytV6p7y+NaNk5eY1ok7h0DrWgujCDvjYk250u8UmgP9zlOdzzZPsEG-OEwQsawTjUNxalvdwZywYCCxyABacDXwwzwPSAA */
  createMachine<TimerContext, TimerEvent>({
    context: { start: O.none, timeEntry: O.none, duration: 0 },
    predictableActionArguments: true,
    id: 'timer',
    type: 'parallel',
    states: {
      timer: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              START: {
                target: 'running',
                actions: assign({
                  start: (_, { payload }) => O.some(payload),
                  duration: _ => 0,
                }),
              },
              CONTINUE: {
                target: 'running',
                actions: assign({
                  start: (_, { payload }) => O.some(payload),
                  duration: (_, { payload }) =>
                    differenceInSeconds(new Date(), new Date(payload)),
                }),
              },
            },
          },
          running: {
            invoke: {
              src: () => cb => {
                const interval = setInterval(() => cb('TICK'), 1000);
                return () => {
                  clearInterval(interval);
                };
              },
            },
            on: {
              TICK: {
                actions: assign({
                  start: ({ start }) => start,
                  duration: ({ start }) =>
                    pipe(
                      start,
                      O.map(start => differenceInSeconds(new Date(), start)),
                      O.getOrElse(() => 0),
                    ),
                }),
              },
              STOP: {
                target: 'idle',
                actions: assign({
                  start: _ => O.none,
                  duration: _ => 0,
                }),
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
  });
