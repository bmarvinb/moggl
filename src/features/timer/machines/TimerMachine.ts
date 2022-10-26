import { differenceInSeconds } from 'date-fns';
import { invariant } from 'shared/utils/invariant';
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

type TimerTypestate =
  | {
      value: TimerState.Idle;
      context: TimerContext & { id: undefined; start: undefined };
    }
  | {
      value: TimerState.Running;
      context: TimerContext & { id: string; start: string };
    }
  | {
      value: TimerState.Creating;
      context: TimerContext & { id: undefined; start: string };
    }
  | {
      value: TimerState.Saving;
      context: TimerContext & { id: string; start: string };
    }
  | {
      value: TimerState.Discarding;
      context: TimerContext & { id: string; start: string };
    };

type TimerEvent =
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
  duration: 0,
  mode: 'Timer',
  timeEntry: {
    description: '',
    projectId: undefined,
    billable: false,
  },
};

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EAWgBsATgoAOAMwAWAOzcNqgEzGArHvNmANCACeiM1oCMFHRqNa9zw6tXc9AF9A2zRMXEIScipaBgBhAHkAOWQASSSAVQBRHn4kEBExSWlZBQRjLwplZQC9VTNuJ0aTWwcEZz0tCm4tVR1DM2cNHrMdYNCMbHxiMkpqOnoMgAUAERZkLIB9HASVnL5ZQokpGXyyrW4KPouzZR1nO8HnY1bEY3qrjz8Dbg7B+vGIDCU0iswoBCwYDwklIUHoEGkc1IADdhABrSjAiIzaIQqEwqAIMiogjQk6cZy8XKHUTHEpnRD6HTdZSWbjmAK-SyvBAGdQXLQaHTKLS3Zz6LSArHTKKUPFk2H0bBYYRYCiCGjQgBmqvQFGloNxkIVhOJwlJxVIFKpB3yR0tpTePQot2MOh0qkF-g0FWUPLMAYo4ueg0sqj09zGISBk2xsvBxoJ9DScQA0tS7bSHQzysozBRLMYHnmKu9nDy9EKKOY1M5-MpnL0zKopbGZWCsABXUikMhwlapRhxdgrDNCLMnR3tX4abqNbge5QaMw+vQ2eyINTKbor7iqYYeCqdVvhdvRLs9vtMZAJJZjgoT+mgMp1S57w+mbhfmqqHleLrGA2S7+M24YAtGBo4pQF69oqKbpra45FJOOb+G+wphoMwrLhWVY1qodbcA2TYaCeIJQRQMFXowLAAGpbGkOBbFkKRsAAmve9ooc+m53N02j3Ko1ROM4Fi4cy+GEcR9QthBbaGpQsB4MiV4ItEZoYvq8kUUpKmwkSKLmmS0i5Jxj6nDx5SVBYnqRgG7h6MoLwbggArVoYGgdBo1QPI5UYTKeCkULpV7Kqq6qauIOpYHqkHxiF+lmha5J8GZyFPvIjJOVUdw9J4AQNr+LnuOoPlLjogHNsKkpyYFFEQKgsCklgDWKmpSKoppcVgg1TV4C1fYGSSxlWqliEPulFmZe0xjshQWg1Kye4BP8Gg8lW+79KKeVCcY2hkXGPWNc1rVwmFaoatqupaXV8a9Sdg1JSNpnjVxGVlM4n2XM2RHDB6uhmBU-pVj6K4EXolhro2B1ngwyxrBsmyMcxrEca95lTooXTuJ5y4WKKooGM5bSKJ9zIBg0e33D6hGkbV5GyvQbBZIwGRMWldJTWUpNqAW2gdD84p7hGPJ5rOAMBoBWjGBG4bBNGpDCBAcCyN16mxDSk1TuGnz1JWxb1p9PL9Ooka-I0TgaBGygw0F8oEprnNTnWs46Cu7wiqYVv7qL7ougVa4FRc0P04d57drBUCO9mlkRsYVSjOKBh1k5IsuWLc5eEuwx7qJZi2zpyl9tH3HTW7egFn0HILcKBHVH+c3eUTBHmMn1QF3dx39adJfvYgn3NgWXhcguFz8xWlR1kWDzuoYMtBKHsO91zShFhXlYuBDX5C+GOg8ljVwmIMHgHo577y4EQA */
export const timerMachine = createMachine<
  TimerContext,
  TimerEvent,
  TimerTypestate
>({
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
