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
  /** @xstate-layout N4IgpgJg5mDOIC5QQE4EMDuYUDoCuAdgNYED2GBAxIqAA6mwCWALo6QTSAB6IC0AHAFYAnDgAMYgGwBmAIzCATP1kKA7GOkAaEAE8+0-mJyzVs+dLHzV-awBYAvve2pM2HKVpgqAFQDyAcX8AGQBRTnomVnZOHgReGVUcWwV5SUtrVWFhW209OKUcfhtFBTkU2UFbWQcnEBcsXABjABsGMEo-QNDwhhY2DiRufWFEhRTBDRSLSVktXT4CosyxsrNK6sdndAbKAFUABQARAEFvEIB9AFlfQ7DBiL7owdjeWzFEyQUxIttVW2FpMkTLl9IZjKZzJYRjZ+I5amQIHBOPU3IQSOQBnRelFMUM4n9BDhJCIsqUvqlBCC4rYZESaQDhPwFJJPpZNnVtm4PF4epF+jE+IJZsZDCZ0vxJG85nlmTghUppKppJ8WcTJOyUU1WrAwLzHriXkLpDhrEV+NkxIJBCzZFTeGZbCbFTJJUVZObFRrOSg9TiBXEisaJDJ5EoVOppYLGUT3QprdUvmpZHD7EA */
  createMachine<DrawerContext, DrawerEvent>(
    {
      context: { mode: undefined },
      predictableActionArguments: true,
      invoke: {
        src: 'handleResize',
        id: 'update-mode',
      },
      id: 'drawer',
      initial: 'unknown',
      states: {
        unknown: {
          always: [
            {
              actions: 'setTemporaryMode',
              cond: 'shouldSetTemporaryMode',
              target: 'closed',
            },
            {
              actions: 'setPermanentMode',
              cond: 'shouldSetPermanentMode',
              target: 'closed',
            },
          ],
        },
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
          const listener = () => send('UPDATE_MODE');
          window.addEventListener('resize', listener);
          return () => {
            window.removeEventListener('resize', listener);
          };
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
