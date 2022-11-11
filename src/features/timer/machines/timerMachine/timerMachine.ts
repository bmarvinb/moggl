import { invariant } from 'common/utils/invariant';
import { differenceInSeconds } from 'date-fns';
import { assign, createMachine } from 'xstate';
import { Context, Events, InitialContext, States } from './types';

const initialContext: InitialContext = {
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

/** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnAsgQwGMALVAOzADpUIAbMAYgGVkBBAJWQG0AGAXUVAAHAPaxUAF1TDSAkAA9EAWgDs3CgBYAjOoBM67soBsAZh2GArDoA0IAJ6JdADgo7jhzdzMfu+4+YC+-jZomLiEJORUtAwAwgDyAHLIAJIJAKoAojz8SCAiYpLSsgoIrsoU3I6aekaG6u6myjb2CIYAnBTKjhbK+pptleY+gcEY2PjEZJTUdPRpAAoAIizIGQD6OHGLWXyy+RJSMrklxmpufnrmylfmjupNdoj9Op1umoY6QzqO3O8jICFxuEphQCFgwHhJKQoPQINJpqQAG7CADWlEBYUmkTBEKhUAQZGRBEhh04ml42T2ogORWODmUxg0jiMqkMbNM6nMhmaiEM3EMFXMHk0mkcV36yn+GImEUoOJJ0Po2CwwiwFEENEhADNVegKNLgdjwQr8YThMTCqQyRTdrl9pbiogdJ4KG1HDo2pprupHMZHG0Hi1OZoKI4w1plK4DJ6pWNMbLQca8fQUjEANKUu3Uh100oWCjaMzGeru8xu4w81pVCo+Sqcj7qTkBIIAuMykFYACupFIZBhi2SjBi7EWmaE2cOjoQwvK5nuorLYeZxjalfcIe0LNFmi5zMlLYNWMoXZ7faYyDi8zHeQntNAJS6HSFbQ93D8bTcvsrOlUNbDc65DwPU0WNQnbSIT17RVUwzW1xwKSdc39Dp6mUCVDAZNoX3UNdq24Ws7i5PROXUUCgSPChILPRgWAANXWFIcHWDIkjYABNa97UQ+9eRMCghj9Zl3XqVxcJDfD9EIhsmzI+MO27KCYQvABxZSABl1gAIWSNS1JYTSNLWZgVjSRhONvI4eIQcNBW0TRTj9RsLErLR1AqYSDGqSNdG4ZtRjAw1KFgPBETPOFIjNNF9TbQKKGC0LoQJJFzRJaRsnMhC73kJ03FdLCfjadx7jadQA0rfoOjacxF2MNxIy9H9ZPAoKQrPZVVXVTVxB1LA9UPBN4r7JKiVSq0+AymlLOyhARPczkDG4AZ+RfSs-QFSS7gDNksLLJrYogVBYGJLADsVcKEWRKL+pBA6jrwE6hrNC1SXGuCb0yqaShFOcNAsXQ9Heap7NWgsd18z1XGeD4TD2ijbuO06YXatUNW1XVooCuHDoRx7kuetLXpyeDJqnDwqooc4hn9BtFvMStqo6RbSvaH9Fo+HRYdlOYlhWdZtiHNhknmFJEgmnMrMUd4OnOXpGnfLlA0QO5nGuIZLHVtbHE5qYUziVTDO03T9MM4zkFMsXuOmoDQ3DAHvmZQDK2Vzpqt+LD13UYx9388iubYDJGDSJiLaykpJd-NxWdtoCcMeBBqvMCoXzQqpauULDjECFtSGECA4Fka6IuiKkPqnAMNG8epTA+ez6lW-kC3XIxfNKvQOYPGKKPlPES5J3MJVDLojEbd1RTQ2OWjnENPh9fQrgZIY2m1iCFL7Xvxem3oXgMeody9f1i0cemfuuRbi1OfoLBAjvMYG1roXXy2Sk5codE3BdXCw1c44qigiv6ESGEhSZxvr7G62N7qI0fqHJ4O4Og7l6GKZ0n9fJrlqq6Fc3wAFjwZMvMA0DPpKDfs4SOqho6eAnkoMUoYirdB0PQ2qvlr6BCAA */
export const timerMachine = createMachine<Context, Events, States>({
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
        TOGGLE_BILLABLE_STATUS: {
          actions: ['toggleBillableStatus', 'updateTimeEntry'],
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
    UPDATE_DESCRIPTION: {
      actions: 'updateDescription',
    },
    TOGGLE_BILLABLE_STATUS: {
      actions: 'toggleBillableStatus',
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
    updateDescription: assign((context, event) => {
      invariant(event.type === 'UPDATE_DESCRIPTION');
      return {
        timeEntry: {
          ...context.timeEntry,
          description: event.description,
        },
      };
    }),
    toggleBillableStatus: assign((context, event) => {
      invariant(event.type === 'TOGGLE_BILLABLE_STATUS');
      return {
        timeEntry: {
          ...context.timeEntry,
          billable: !context.timeEntry.billable,
        },
      };
    }),
    updateDuration: assign({
      duration: context => {
        invariant(context.start, 'Start date should be provided');
        return differenceInSeconds(new Date(), new Date(context.start));
      },
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
