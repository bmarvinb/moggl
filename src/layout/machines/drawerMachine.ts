import { assign, createMachine } from 'xstate';

export type DrawerMode = 'temporary' | 'permanent';

export type DrawerState = 'open' | 'closed';

type DrawerContext = {
  mode?: DrawerMode;
};

type DrawerTypestate = { context: DrawerContext; value: DrawerState };

type DrawerEvent =
  | {
      type: 'TOGGLE';
    }
  | { type: 'UPDATE_MODE' }
  | { type: 'CLOSE' };

export const drawerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQE4EMDuYUDoD2ADmAHYDEAKgPIDi1AMgKIDaADALqKgF6wCWALrzzFOIAB6IArADYWOAEwAOAOzKWy6ZICcyrQGZJAGhABPRABZzOAIy75WyfOt6t1ldIC+H46kzZ8RGQAwnSUAMrM7KLcfILCohIIMtI40tLm0op60sr2qsZmCNbS8qnOWormitJ6yor65l4+6Fi4AMYANjyQFDT0kRxIIDECQiJDiTJySqrqmjr6RqaISoo4i5WVktbyLpJNIL6tpACqAAoAIgCC5AwA+gCylBcD0Tyj8RMW8gUretOSFgsf7ySyKSouA5HbCnS43e5PF5MayDLjvOLjUCJczWHCKIE4yTKSR6UHKPTZX4IeTKPHyFgyDJAvTFPTgrzeEDEPAQOCiaG4QgkN6xMYJRCZFI7YnyWU6YksRRU4qlaTlck4rTSHSSRqcgU4TrdCAij6Y8QWcx6GzWHRk9Rael6czKkplFxqnWyIn7fUtbCmjHihB7G128xqOzAl3LBAAWkdODqkhJpNU9icyg5HiAA */
  createMachine<DrawerContext, DrawerEvent, DrawerTypestate>(
    {
      context: {},
      predictableActionArguments: true,
      invoke: {
        src: 'handleResize',
        id: 'update-mode',
      },
      initial: 'closed',
      id: 'drawer',
      states: {
        open: {
          on: {
            TOGGLE: {
              target: 'closed',
            },
            CLOSE: {
              target: 'closed',
            },
          },
        },
        closed: {
          on: {
            TOGGLE: {
              target: 'open',
            },
          },
        },
      },
      on: {
        UPDATE_MODE: [
          {
            cond: 'shouldSetTemporaryMode',
            actions: 'setTemporaryMode',
            target: 'closed',
          },
          {
            cond: 'shouldSetPermanentMode',
            actions: 'setPermanentMode',
            target: 'closed',
          },
        ],
      },
    },
    {
      actions: {
        setTemporaryMode: assign({
          mode: _context => 'temporary',
        }),
        setPermanentMode: assign({
          mode: _context => 'permanent',
        }),
      },
      services: {
        handleResize: () => send => {
          const onResize = () => send('UPDATE_MODE');
          window.addEventListener('resize', onResize);
          onResize();
          return () => window.removeEventListener('resize', onResize);
        },
      },
      guards: {
        shouldSetTemporaryMode: (context: DrawerContext) =>
          window.innerWidth <= 768 && context.mode !== 'temporary',
        shouldSetPermanentMode: (context: DrawerContext) =>
          window.innerWidth > 768 && context.mode !== 'permanent',
      },
    },
  );
