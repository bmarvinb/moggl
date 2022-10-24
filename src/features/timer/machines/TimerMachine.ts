import { invariant } from 'common/utils/invariant';
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
  start?: string;
  timeEntry: TimeEntryData;
  mode: TimerMode;
  duration: number;
};

type TimerEvent =
  | { type: 'START'; start: string }
  | { type: 'START.SUCCESS'; id: string }
  | { type: 'START.ERROR' }
  | {
      type: 'CONTINUE';
      data: { id: string; start: string; timeEntry: TimeEntryData };
    }
  | {
      type: 'RESUME';
      data: { id: string; start: string; timeEntry: TimeEntryData };
    }
  | {
      type: 'RESUME.SUCCESS';
    }
  | {
      type: 'RESUME.ERROR';
    }
  | { type: 'STOP' }
  | { type: 'SAVING.SUCCESS' }
  | { type: 'SAVING.ERROR' }
  | { type: 'DISCARD' }
  | { type: 'DISCARD.SUCCESS' }
  | { type: 'DISCARD.ERROR' }
  | { type: 'UPDATE_TIME_ENTRY'; data: Partial<TimeEntryData> }
  | { type: 'SAVE_TIME_ENTRY' }
  | { type: 'TICK' }
  | { type: 'UPDATE_MODE'; mode: TimerMode };

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EAJgDMyitwCsAFgBsAdmUAOTXsWKAnMoA0IAJ6INynRQ2LTWwwEYNht3q0AvgE2aJi4hCTkVLQMAMIA8gByyACSiQCqAKI8-EggImKS0rIKCCpqmroGxhqmFtZ2SoqGFJ6e5tz6hr6WymZBIRjY+MRklNR09OkACgAiLMiZAPo48bPZfLIFElIyeaW16tzHJ6fHnjb2CMqarc16Gjo6WgY3OgMgocMRYxQEWGA8JJSFAmKwOBRGOlYrFMoxGDktqIdsV9ogdI4KA89K9zDplHpuAZLujzBoKH0dJ4zJpDNpfB8vuFRlF-oDgaDmOxkBRMmw2PE2Ii8tsintQKVFM9Wlp2h5uOYvOZZSSEB4tC4qtpOrpuJ5uMpGUNmZFKGygWRQalYgBpYVCZFikqIDx6ChaJyeXw6PUdbiKVUabTqDRE444vTPQzvYKfY0jU0ULAAV1IpEt9FmKUYsXYs3t+Udu2dCH1oYo+PMZkezTaOlVOnMbu9mmavjaLyNYQTvxTaYzzHi0wLouLaIQBkULiJOKJHnbelVBLUUs8laMqnKei73xZlD76ZB9Gtds2IqLqIliEMyvdyg8yn1ni0Bvagcxei9+Ken8UXs8O4mr2qaHpyLAAGrLKkODLJkyRsAAmiOF7ivI15Bq05iKv4L6KFoTYaKqWjBh696WPo3AehGgE9lEsB4AAbgOEFpAA4ry-KCshhRjleCAYmo2K4vihLEo0aqKOSeGKDqNyaE8Uo0T8dGMcx4FsZC0KwvC3EoqhkqqCGVRGCYZiWEudIUKujiWJJFifkpe4UBAqCwAQeBYC5R5ZjmeYcQKQpng6PGXmhpadOYFDmGuPjPI2uGEeJzzkoYxGNp+so3I4jmJi5bkeV5oI+bmbCzJpMJwgiQWFiF+mIGW3AVsoVaSTotZrqqvhRZG+H4r42g3IoOVjFMcwLFBKQwUscHIIhulOuOzxTmubhSt0yoWIlVxeFJeIPD6ejKpGhjDeQ9BsHC6QwfNvFhU2UU3rUqXPgYVKLklXgVo2SoYtG+gxrGpDCBAcCyEytHjDESK1SW92KmSejPS8nrvVcL6RZlN54h4bQKqdZoAhaILQ3pJYelJFieEYMmGIdh31klPgUsoPhUYjWgWPjSYgZaJMLXxdIatS3SpXSTb6A2TPHAS9OflhqVc-RTHE+eMPjh6jVmVTvjcLTTZ4hZ5KygRGL+uUQ2xuDymUHl7mebzquk+O1Jte6MWKtoyo6IYDRXAJLg3l4aVU8qAGW-G1t87dpSRWcccnKjiAALTOKcjaeD1qhaPhQRBEAA */
export const timerMachine = createMachine<TimerContext, TimerEvent>({
  context: {
    timeEntry: { projectId: undefined, description: '', billable: false },
    mode: 'Timer',
    duration: 0,
  },
  predictableActionArguments: true,
  id: 'TimerMachine',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'creating',
          actions: assign({
            start: (_, event) => event.start,
          }),
        },
        CONTINUE: {
          target: 'running',
          actions: assign({
            id: (_, event) => event.data.id,
            start: (_, event) => event.data.start,
            mode: _ => 'Timer',
            timeEntry: (_, event) => event.data.timeEntry,
          }),
        },
        UPDATE_MODE: {
          actions: assign({
            mode: (_, event) => event.mode,
          }),
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
        },
      ],
      on: {
        'START.SUCCESS': {
          target: 'running',
          actions: assign({
            id: (_, event) => event.id,
          }),
        },
        'START.ERROR': {
          target: 'idle',
        },
        TICK: {
          actions: assign({
            duration: context => {
              invariant(context.start, 'Start date should be provided');
              return differenceInSeconds(new Date(), new Date(context.start));
            },
          }),
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
          actions: assign({
            duration: context => {
              invariant(context.start, 'Start date should be provided');
              return differenceInSeconds(new Date(), new Date(context.start));
            },
          }),
        },
        SAVE_TIME_ENTRY: {
          actions: 'updateTimeEntry',
        },
      },
    },
    saving: {
      invoke: {
        src: 'stopTimeEntry',
      },
      on: {
        'SAVING.ERROR': {
          target: 'running',
        },
        'SAVING.SUCCESS': {
          target: 'idle',
          actions: assign({
            duration: _ => 0,
            timeEntry: _ => ({
              description: '',
              projectId: undefined,
              billable: false,
            }),
          }),
        },
      },
    },
    discarding: {
      invoke: {
        src: 'discard',
      },
      on: {
        'DISCARD.ERROR': {
          target: 'running',
        },
        'DISCARD.SUCCESS': {
          target: 'idle',
          actions: 'reset',
        },
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
      actions: assign({
        id: (_, event) => event.data.id,
        start: (_, event) => event.data.start,
        mode: _ => 'Timer',
        timeEntry: (_, event) => event.data.timeEntry,
      }),
    },
  },
}).withConfig({
  actions: {
    reset: assign({
      id: _ => undefined,
      start: _ => undefined,
      duration: _ => 0,
      timeEntry: _ => ({
        description: '',
        projectId: undefined,
        billable: false,
      }),
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
  guards: {},
});
