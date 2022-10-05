import { media } from 'core/theme/config';
import { assign, createMachine } from 'xstate';

export enum DrawerMode {
  Temporary = 'Terporary',
  Permanent = 'Permanent',
}

type DrawerContext = {
  mode: DrawerMode | undefined;
};

type DrawerEvent =
  | {
      type: 'TOGGLE';
    }
  | { type: 'UPDATE_MODE' };

export const drawerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQE4EMDuYUDoD2ADmAHYDEAKgPIDi1AMgKKKgF6wCWALu3scyAA9EAWgDsAFgCMOAGwBOAKxK5MgMyjRkuQBoQATxGrJ4nFrmqAHHIsAmUTIAMNhQF8Xu1Jmw4AxgBs2SAoaeiYkEFYObl5+IQRhBRtpDQsjOwdRC1E5cV0DeKMTM0trO0dnNw90LBRSAFUABQARAEFyBgB9AFlKJrCWNi4ePnC44TkHaS1RJ2zncUmdfREZBWSHcVF1DIzxGXE3dxBiPAg4fk8a-CIRgajh2JWbGRwpRwUZNWtVSzyRG3EJgcqgBM32CnEVgBlRAl28-kCEH4kSGMVGKyMOFENhsDjkdkkIOMfwKWVkEk2ayUSS0riOcJQyMG0VughE+IUpjkMzsHIWWhJYgsLxk9kkkk0ElShxcQA */
  createMachine<DrawerContext, DrawerEvent>(
    {
      context: { mode: undefined },
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
            actions: 'setTemporaryMode',
            cond: 'shouldSetTemporaryMode',
            target: '.closed',
          },
          {
            actions: 'setPermanentMode',
            cond: 'shouldSetPermanentMode',
            target: '.closed',
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
          const cb = () => send('UPDATE_MODE');
          window.addEventListener('resize', cb);
          cb();
          return () => window.removeEventListener('resize', cb);
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
