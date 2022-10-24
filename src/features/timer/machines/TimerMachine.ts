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

type StartEvent = { type: 'START'; start: string };
type StartSuccessEvent = { type: 'CREATING.SUCCESS'; id: string };
type ContinueEvent = {
  type: 'CONTINUE';
  data: { id: string; start: string; timeEntry: TimeEntryData };
};
type ResumeEvent = {
  type: 'RESUME';
  data: { id: string; start: string; timeEntry: TimeEntryData };
};
type UpdateTimeEntryEvent = {
  type: 'UPDATE_TIME_ENTRY';
  data: Partial<TimeEntryData>;
};
type UpdateModeEvent = { type: 'UPDATE_MODE'; mode: TimerMode };

type TimerEvent =
  | StartEvent
  | StartSuccessEvent
  | { type: 'CREATING.ERROR' }
  | ContinueEvent
  | ResumeEvent
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
  | UpdateTimeEntryEvent
  | { type: 'SAVE_TIME_ENTRY' }
  | { type: 'TICK' }
  | UpdateModeEvent;

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EANkUUAnIoDsAFkUBGddwCsGjbt0AaEAE9EhgEyG19xQGZFADjv73ZgL6-LNExcQhJyKloGAGEAeQA5ZABJOIBVAFEefiQQETFJaVkFBC1TCm4XVQ0K1UNFO247RUNLGwR6lQ07F0atT0N3LXrDf0CMbHxiMkpqOnoUgAUAERZkNIB9HBjFjL5ZXIkpGWyigFotFwoXY113AZd3ctqLa0QXbg0KEo1uXS1el30AJGICC41CUwoBCwYDwklIUHoUTYaRWyQA4hRGCkolE0oxGJk9qIDgVjkpDBcNMYNO43Fc7JVmi8EJpdBRNPdau5VKpftzgaCQpNwlCYXCEUiUUk4hi0mw2DE2ITsvt8kdQEUHFoKLo7DTPNzujdFC1EL0PtwtNxVHZbS5TA13MMAiCxkKwpRRbCyAiklEANLKoTEtWFM08iiGX6me72ro000IDSqbjsnwlSpvG26RQCt0TD0ULAAV1IpB99EWiUYUXYiyDORDhzDCF03HcH267g8ihT6h6id7jk8eh+GlchhKWjzwQLEJLZYrzBi8wbqubZJZqguum6NMGtvq90T9oujTqih0PJ5hgpM7BwsoC-L8PofsDuxVTdJGsQvO1qgjsoTTJlaWiJiYnaKO2dg6G4VSTve7rzqWL4IowLAAGrrEkODrGkCRsAAmmu37qvIf7vGm47dgyqiDO4ib2I4NSNG4njeH4LqCnO4SwHgABuS5YeiFBygqSqfsGeQbr+LLGJ89FUheJi9KoiaDABALGMotHbnYSG8ZQ-FCa+GGYaJWI4niBJSY2Mk-hRbS6mUtKslo27qJedgnlRJS9jU2g0rB7iGeC4QQKgsAEHgWCRa+VY1nWYnyoqpEOeRRRtr2ag5nUN5GNwyiDlow6ldotzKKYgFhY+FCRdFsXxQiiW1mwiyYtiuL4ulJKZUo5xlJOHLJnqHguImtzsn2XhvLe45XLVHpzEsKw4YkeFrARyDEb1oabichgNGURUBZOY0lEyrRtgBUa9H8TQUro45LVM9DIlieF7bJTknPo2rJk6TSAb0djpr5Hz+TeQWeCULj+C6pDCBAcCyDx4XTJERIZS2lRqNyhjZryR2Ghp1qfL8bb2NaDK2s6oyzhjkLQt68LY31LbnGytKdDS2jXFcV3kh8tKEx2OgDJO8PcfmTPPj67P7XJTrarqtznCmt7doxzJNO4J33OOvZVAyuivXxgkK1+OObucqa2ryAzlRUfwaCeToUzyyj0R5Xy5jLjN1Q1MVxVb0kc5uup1BTj3bv0DiuIOFKRtyPguOx3bSwzD4eorP2nLBdgUIDtRi6D4PMic9tAwC7weM9Bo1AjvhAA */
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
        },
      ],
      on: {
        'CREATING.SUCCESS': {
          target: 'running',
          actions: 'assignId',
        },
        'CREATING.ERROR': {
          target: 'idle',
        },
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
      },
      on: {
        'SAVING.ERROR': {
          target: 'running',
        },
        'SAVING.SUCCESS': {
          target: 'idle',
          actions: 'reset',
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
      actions: 'resume',
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
    assignId: assign({
      id: (_, event) => (event as StartSuccessEvent).id,
    }),
    assignStart: assign({
      start: (_, event) => (event as StartEvent).start,
    }),
    assignMode: assign({
      mode: (_, event) => (event as UpdateModeEvent).mode,
    }),
    updateDuration: assign({
      duration: context => {
        invariant(context.start, 'Start date should be provided');
        return differenceInSeconds(new Date(), new Date(context.start));
      },
    }),
    continue: assign({
      id: (_, event) => (event as ContinueEvent).data.id,
      start: (_, event) => (event as ContinueEvent).data.start,
      timeEntry: (_, event) => (event as ContinueEvent).data.timeEntry,
      mode: _ => 'Timer',
    }),
    resume: assign({
      id: (_, event) => (event as ResumeEvent).data.id,
      start: (_, event) => (event as ResumeEvent).data.start,
      timeEntry: (_, event) => (event as ResumeEvent).data.timeEntry,
      mode: _ => 'Timer',
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
