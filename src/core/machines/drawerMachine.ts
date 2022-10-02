import { media } from 'theme/config'
import { assign, createMachine } from 'xstate'

export enum DrawerMode {
  Temporary = 'Terporary',
  Permanent = 'Permanent',
}

type DrawerContext = {
  mode: DrawerMode
}

type DrawerEvent =
  | {
      type: 'TOGGLE.DRAWER'
    }
  | { type: 'UPDATE_MODE' }

export const drawerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQE4EMDuYUDoD2ADmAHYDEAKgPIDi1AMgKI4AiASgIIDqDrioBeWAEsALkLzE+IAB6IAtABYAnAEYcADgDsANnUKADJqUKArACZ16kwBoQAT3mmcm-SoVmzChdoNalAX39bVExsHABjABtBMAoaeiY2Lh4pAWExCSlZBDkzTXUcJSVtEwBmJVKTF3VS7VLbBxynFzcPLx99P0Dg9CwUUgBVAAVmdnIGAH0AWUpmBlTBUXFJJBl5EyrCzVKFTQVSlW0jjwb5WpMcT231XU6vV0CgkGI8CDgpEL78IhX+RYzfmscqVKs46ntStslBtjKcECoLlp1Cp8rtNBs3CZ1N0QJ8wlEYgt0sssmdajhIZ4fEobsU3HC5Cp9NpnKoKkZ9GUDGUcXiUESlplVtk5Fi1Eptrt9odjmYGSZ9PpLiokV4TGqVMVHv4gA */
  createMachine<DrawerContext, DrawerEvent>(
    {
      context: {
        mode:
          window.innerWidth <= media.md
            ? DrawerMode.Temporary
            : DrawerMode.Permanent,
      },
      invoke: {
        src: 'handleResize',
      },
      id: 'drawer',
      initial: 'close',
      states: {
        open: {
          on: {
            'TOGGLE.DRAWER': {
              target: 'close',
            },
          },
        },
        close: {
          on: {
            'TOGGLE.DRAWER': {
              target: 'open',
            },
          },
        },
      },
      on: {
        UPDATE_MODE: [
          {
            actions: ['setTemporaryMode'],
            cond: context =>
              window.innerWidth <= media.md &&
              context.mode !== DrawerMode.Temporary,
            target: '.close',
          },
          {
            actions: ['setPermanentMode'],
            cond: context =>
              window.innerWidth > media.md &&
              context.mode !== DrawerMode.Permanent,
            target: '.close',
          },
        ],
      },
    },
    {
      actions: {
        setTemporaryMode: assign({
          mode: _ => DrawerMode.Temporary,
        }),
        setPermanentMode: assign({
          mode: _ => DrawerMode.Permanent,
        }),
      },
      services: {
        handleResize: () => send => {
          const listener = () => send('UPDATE_MODE')
          window.addEventListener('resize', listener)
          return () => {
            window.removeEventListener('resize', listener)
          }
        },
      },
    },
  )
