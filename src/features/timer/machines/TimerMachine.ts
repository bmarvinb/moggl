import { invariant } from 'common/utils/invariant';
import { differenceInSeconds } from 'date-fns';
import { assign, createMachine } from 'xstate';

type TimeEntryData = {
  projectId: string | undefined;
  description: string;
  billable: boolean;
};

type TimerContext = {
  id?: string;
  start?: string;
  timeEntry: TimeEntryData;
  mode: 'Timer' | 'Manual';
  duration: number;
};

type TimerEvent =
  | { type: 'START'; start: string }
  | { type: 'START.SUCCESS' }
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
  | { type: 'TICK' };

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EARgAcANgoBOAEzKAzBsWLd+gCzKNJgDQgAnogCsu9fa0B2Xfe673y7htUAvgHWaJi4hCTkVLQMAMIA8gByyACSiQCqAKI8-EggImKS0rIKCCrq2noGRqbmVraIWjoUhgYeqtzKrqqKqq5BIRjY+MRklARYYHiSpFBMrBwUjOmxsZmMjDmyBRJSMnmlHa4UqrqKJhr2ihpeGt3WdgiqlxS6Wqpa9qpfrjrPAyBQsMImMKBMpjM5sx2MgKJk2Gx4mwtnkdkV9qBSloVBRuIovr0vJ1sbplA9EGYTBR7CZVF0tNxuCTvgCgeFRlFwdMyHNUrEANIooSiXbFA4UkyKV5+G7KL7KC69VTkhD2Gm4zx6RyqEwuLQmVlDdmRShYACupFIPPoABEUoxYuwbUL8iL0SUlIyqVctHcjIpuCYLmSGk87hRlO8GW88RozgbgoCjSMTRRzZbrcx4gAFF1ovYep5qV7KfG9aqOVwq7y6Cjvct+N6uX4mfqJtkp0Hpq2zeh8wV8bZugvihAK5TSuV0yXPRwaFVq2uuFSuCw++yl5SGsKdqLdzMsABqmQA+qkcKfMsk2ABNPPDsWYxC+DS49xXeNaM7uFW6qkmYwPjlJplzxBNBh3EEolgPAADcD0PNIAHE4QRJF70KEcnyebhjlOc5LmuW57lDExPjrMjy10QMgzVbdgQ5SgYPg3tGCPZClhWNYNgw0UMXkJRi0qfRDGMCw6mrOU6x6VxuA6RQmh1DR6ONUEIFQWACDwLB1N7O0HSdVDEWRQdUQffjSgDL8KFXJlmzxSMXHqR4dXsCNdWbD5rlaLQVN3Sh1M07TdLmfTHTYG1ONWdZNlM4VMMfASyi9akFL9M4aI0ENHkjTRujVetSU+ZT22TKCGHSbMbRYZBT3PS9rzvOLXQSizEB6V8ZUcd4nH1VxnOffE638OMug+DQDC3UrIMY+g2HWdIL1491R3sKtQzpKVVGeLLOkDHp-gBUhhAgOBZA7crojoIdWsLLoIxcZQ5RpQxXA3X8-AoSUTEDLLmTIvzLq5SEbr4wtSVfKynrWvFFFkrQVW+CdAMZIwaVMXzpoY1N91mUGVuw3wJ0ZT5nh0X1W10RGN1xW4Ok8fVHHsQHGIoZieXxrCktJKkoblWTXqZSS3MlCbqLVVd5V0FnU0CrSdI5szbtHBTemGplPg3LonoRjbHGpcxzDpXDtG8GWxk5xLSnnUMAFo3Imx2nadtagiCIA */
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
            timeEntry: (_, event) => event.data.timeEntry,
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
