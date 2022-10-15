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
      payload: ActiveTimeEntry;
    }
  | {
      type: 'STOP';
    }
  | {
      type: 'MODE.TOGGLE';
    };

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVA2gAwC6ioADgPayprcAdhxAAPRAFoAnABYAjDmZS5ADlVyAzPIBsGgKwAaEAE9JUgEw5zzOeb3nzMvdr0a5AdgC+no-mx4MfyJSMgBhAHkAOSoASUiAVQBRFnYkEB4+AWE08QQJPRlmHBkNKVcVbUd3J20jUzyNZhUcKRVmdzLlFRU7bW1vX0DcP1wsAFdBQVRBKDJY0IBpFJEM-lQhEVyJQr0cHvdzDWsNStapOsk5ZiKrvT1bbRlzPpt+nxARgIIcccnp2eo4QACss0qssptJB0ZC1mEcpNpqu4+hp3Bc8nJtFIcCdmDIZBVHFJ2jIBh8hjh0NwIGAvtgyABZcIAEUSOCo4QA4pyADLJNgrXhrDY5RCuHHMbRyOSySVNBEndESGVFdqPOQyA5wtTmFRkz5UmmUgCGgjGxuIjJZbI53L5oK4QohooQ4saUplhW08t0tRMkm9ON0DgebjaGj1ZME1LgIk+n2CYEFmXW2VAWws7hw2nDMj69nMSKVjQUKgj7gKznMxI6+opn1+UxmyeFabEkjuGhw9gKZdk1hKMiVmOx7mYDjH8r0Ki6de+IxbzvTZhnii66i0mP0xakWbK7lK7jHDj0u70c-8htpC7BTtTkLyDhwHROFmsFYP0r99WVGi7R8LBEDzha5I0Gb4rxNM0LUXe8XU9KxpROcwkIOaVzGHP9nwODpEUaRomgvXAr1gkVlzyMdnykV8HHaPRPww-1Hw6RR7ARWVqgsIjSLbLYrlRNd1DUTddEMJjtgqFo-zKQ4Z1RPE3m8IA */
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
                  timeEntry: (_, { payload }) => O.some(payload),
                  start: (_, { payload }) =>
                    O.some(new Date(payload.timeInterval.start)),
                  duration: (_, { payload }) =>
                    differenceInSeconds(
                      new Date(),
                      new Date(payload.timeInterval.start),
                    ),
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
