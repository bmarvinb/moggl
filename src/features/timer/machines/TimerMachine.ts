import { invariant } from 'shared/utils/invariant';
import { differenceInSeconds } from 'date-fns';
import { assign, createMachine } from 'xstate';

export type TimerMode = 'Timer' | 'Manual';

type TimeEntryData = {
  projectId: string | undefined;
  description: string;
  billable: boolean;
};

type TimerContext = {
  id?: string;
  start?: Date;
  timeEntry: TimeEntryData;
  mode: TimerMode;
  duration: number;
};

export enum TimerState {
  Idle = 'idle',
  Running = 'running',
  Creating = 'creating',
  Discarding = 'discarding',
  Saving = 'saving',
}

export type TimerEvent =
  | { type: 'START'; start: Date }
  | {
      type: 'CONTINUE';
      data: { id: string; start: Date; timeEntry: TimeEntryData };
    }
  | {
      type: 'RESUME';
      data: { id: string; start: Date; timeEntry: TimeEntryData };
    }
  | { type: 'STOP' }
  | { type: 'DISCARD' }
  | {
      type: 'UPDATE_TIME_ENTRY';
      data: Partial<TimeEntryData>;
    }
  | { type: 'SAVE_TIME_ENTRY' }
  | { type: 'TICK' }
  | { type: 'UPDATE_MODE'; mode: TimerMode };

const initialContext: TimerContext = {
  id: undefined,
  start: undefined,
  duration: 0,
  mode: 'Timer',
  timeEntry: {
    description: '',
    projectId: undefined,
    billable: false,
  },
};

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EAWgBsATgrcATMuUBGAMwAOAKzL9m7gBZdAGhABPRJdUB2Coc2bDh7spfmXY0tjAF8QuzRMXEIScipaBgBhAHkAOWQASVSAVQBRHn4kEBExSWlZBQRNfTcdbhcXVWNuY30W1U07RwRdfw19VUtuE10ffSCwiIxsfGIySmo6emyABQARFmRcgH0cZLX8vlkSiSkZIsrFawoG1VVDS0aGrWNVLsQ2-QoLb09zXWUlkMNUmIEiMxi8woBCwYDwklIUHoEGkC1IADdhABrSjg6JzOIwuEIqAIMiYgjws6cXS8ArHUSncoXJwuSwaPwWTTNFzcXqdByIXnqT4PMymXSPfSgvGzWKUIlUxH0bBYYRYCiCGjwgBm6vQFFlkMJsKVpPJwkpZVINLpRyKJ2tFUQml03AoRks+iGgMMvQBlneCGMroojxDul0rRcD2BMum+Pl0NNJPomUSAGl6Q7GU6WVVlMYKKpdJoYwD6t6vEGfOpBtw7i4yw9LI941E5VCsABXUikMhItYZRiJdhrbNCXNnZ09PmGDQtKyqZQmDyBINqZQaYy1ny-GrS8JghOduI9vsDpjIZIrCfFKfM0CVRruhu-TzcT-KBtBg-fPQrqo7SuE07YQgSlDnv2yrplm9qTqU075oYdzFqu4zfq2AKGDWbQ3N+krLoEowDGBiZdr20FIowLAAGo7JkOA7Lk6RsAAmnejpIU+iCYTc3KFjUHi+C0uHui4BHOH4xijJYZGnpQsB4Oil4onEFo4oaJ7GopykDmSGKWlS0gFJxD7nDxVQ1BQxiNN6krGEEhgSQK3SfN8wx+jGOgAhJclHkaEEUEpKnKqq6qatq4h6lgBqBUmIX6RaVrUnwZmIY+8hOMomgUDoQxltwAzivoyhBhGYbETGjSPLyLjyTpFAQKgsCUlgzXKmpaKYpp8VQs1rV4O1SWGSlJlpfB94ZRZWU9FyHrfn4Db1DJ9w1uy9xDOMRUoTlcYBdpQUDW1HVIuFGparq+paR2jXHUNp0GRSxk2hNhQIUyM2VJGbo3N4gxtDJXn6BuwTuMEO7LhYjkSQ1EHLOsmwMRkTHbCxyDseln0zooXxAn6Ji2eM4y8q5SiRuyjnNF41geLoQGGHD8r0GwuSMNkTFY3mlmKL04kE85FZ8q0gaCggha6MWgJ+N6O4+I5YRHqQwgQHAsh9epCQMtNM6uGhTTljoQF6LYYtDOo1hDG6jlGGyyhM1Cioktr2P5vT87BB4y7mF4jQ4WLgKU-U0nB20BgO2elEDi73OzWyuWFpbvL0zlbIbjuC41CuPgNlGoQHbdQWJYiMfcbNwRuDV3JFdLJY6L+WjuEtmgltyyc6BHlD3cNJc5jrbtRuo-jJ7yXrDPopvdMPFD066AZDGu9UF+B8ql5llyuvO5beC4QtRt6Qa48WHStHyi3ig0ishEAA */
export const timerMachine = createMachine<TimerContext, TimerEvent>({
  context: initialContext,
  predictableActionArguments: true,
  id: 'TimerMachine',
  initial: 'idle',
  states: {
    idle: {
      entry: 'reset',
      on: {
        START: {
          target: 'creating',
          actions: 'assignStart',
        },
        CONTINUE: {
          target: 'running',
          actions: 'continue',
        },
        UPDATE_MODE: {
          actions: 'assignMode',
        },
      },
    },
    creating: {
      invoke: [
        {
          src: 'startTimer',
        },
        {
          src: 'addTimeEntry',
          onDone: [
            {
              target: 'running',
              actions: assign({
                id: (_, { data: id }) => id,
              }),
            },
          ],
          onError: [
            {
              target: 'idle',
            },
          ],
        },
      ],
      on: {
        TICK: {
          actions: 'updateDuration',
        },
      },
    },
    running: {
      invoke: {
        src: 'startTimer',
      },
      on: {
        DISCARD: {
          target: 'discarding',
        },
        STOP: {
          target: 'saving',
        },
        TICK: {
          actions: 'updateDuration',
        },
        SAVE_TIME_ENTRY: {
          actions: 'updateTimeEntry',
        },
      },
    },
    saving: {
      invoke: {
        src: 'stopTimeEntry',
        onDone: [
          {
            target: 'idle',
          },
        ],
        onError: [
          {
            target: 'running',
          },
        ],
      },
    },
    discarding: {
      invoke: {
        src: 'discard',
        onDone: [
          {
            target: 'idle',
            actions: 'reset',
          },
        ],
        onError: [
          {
            target: 'running',
          },
        ],
      },
    },
  },
  on: {
    UPDATE_TIME_ENTRY: {
      actions: assign({
        timeEntry: (context, event) => ({
          ...context.timeEntry,
          ...event.data,
        }),
      }),
    },
    RESUME: {
      target: '.creating',
      actions: 'resume',
    },
  },
}).withConfig({
  actions: {
    reset: assign(_ => initialContext),
    assignStart: assign({
      start: (_, event) => {
        invariant(event.type === 'START', 'Event has improper type');
        return event.start;
      },
    }),
    assignMode: assign({
      mode: (_, event) => {
        invariant(event.type === 'UPDATE_MODE', 'Event has improper type');
        return event.mode;
      },
    }),
    updateDuration: assign({
      duration: context => {
        invariant(context.start, 'Start date should be provided');
        return differenceInSeconds(new Date(), new Date(context.start));
      },
    }),
    continue: assign((_, event) => {
      invariant(event.type === 'CONTINUE', 'Event has improper type');
      return {
        id: event.data.id,
        start: event.data.start,
        timeEntry: event.data.timeEntry,
        mode: 'Timer',
      };
    }),
    resume: assign((_, event) => {
      invariant(event.type === 'RESUME', 'Event has improper type');
      return {
        id: event.data.id,
        start: event.data.start,
        timeEntry: event.data.timeEntry,
        mode: 'Timer',
      };
    }),
  },
  services: {
    startTimer: () => send => {
      const interval = setInterval(() => send('TICK'), 1000);
      send('TICK');
      return () => {
        clearInterval(interval);
      };
    },
  },
});
