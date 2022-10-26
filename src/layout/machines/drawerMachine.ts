import { media } from 'theme/config';
import { assign, createMachine } from 'xstate';

export enum DrawerMode {
  Temporary = 'Temporary',
  Permanent = 'Permanent',
}

type DrawerContext = {
  mode?: DrawerMode;
};

type DrawerEvent =
  | {
      type: 'TOGGLE';
    }
  | { type: 'UPDATE_MODE' }
  | { type: 'CLOSE' };

export const drawerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQE4EMDuYUDoD2ADmAHYDEAKgPIDi1AMgKIDaADALqKgF6wCWALrzzFOIAB6IArADYWOAEwAOAOzKWy6ZICcyrQGZJAGhABPRABZzOAIy75WyfOt6t1ldIC+H46kzZ8RGQAwnSUAMrM7KLcfILCohIIMtI40tLmmvpaLNbS8sZmCG5y+ta25ormDubWkopePuhYuADGADY8kBQ09JEcSCAxAkIiA4kyckqq6pm6BgWISoo4+nUV5pLW8i6SDSC+zaQAqgAKACIAguQMAPoAspRnfdE8w-FjFvmmi3qTkiwsX7ySyKSouPYHbDHc5XW4PJ5Maz9LivOKjUCJGo4RQAmqSZSSPTA5R6PTSBYIeTKbHyFgyDIAvS5PSgrzeEDEPAQOCiSG4QgkF6xEYJRDSRSSHAVBxOHFaDJacnfSnqHAsLT6IlU2SK3IQpr+dqdCBCt7o8QWcx6GzWHTE9RaWl6cwU3LyVLOXU6Cb43bsvmmtGihAAWhStoclWB0gJ8jSLuVIes6pslipTN+ZTj8jZHiAA */
  createMachine<DrawerContext, DrawerEvent>(
    {
  context: {},
  predictableActionArguments: true,
  invoke: {
    src: 'handleResize',
    id: 'update-mode',
  },
  id: 'drawer',
  initial: 'closed',
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
        target: '.closed',
        cond: 'shouldSetTemporaryMode',
        actions: 'setTemporaryMode',
      },
      {
        target: '.closed',
        cond: 'shouldSetPermanentMode',
        actions: 'setPermanentMode',
      },
    ],
  },
},
    {
      actions: {
        setTemporaryMode: assign({
          mode: _context => DrawerMode.Temporary,
        }),
        setPermanentMode: assign({
          mode: _context => DrawerMode.Permanent,
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
          window.innerWidth <= media.md &&
          context.mode !== DrawerMode.Temporary,
        shouldSetPermanentMode: (context: DrawerContext) =>
          window.innerWidth > media.md && context.mode !== DrawerMode.Permanent,
      },
    },
  );
