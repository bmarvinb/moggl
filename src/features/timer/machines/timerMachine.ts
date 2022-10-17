import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { invariant } from 'common/utils/invariant';
import { differenceInSeconds } from 'date-fns';
import { NewTimeEntry } from 'features/timer/models/time-entries';
import {
  createTimeEntry,
  stopTimeEntry,
} from 'features/timer/services/time-entries-api';
import { assign, createMachine, DoneInvokeEvent } from 'xstate';

export const enum TimerMode {
  Timer = 'Timer',
  Manual = 'Manual',
}

export type TimerContext = {
  duration: number;
  workspaceId: string;
  userId: string;
  newTimeEntry: NewTimeEntry;
  queryClient?: QueryClient;
};

type TimerEvent =
  | {
      type: 'TICK';
    }
  | {
      type: 'START';
      payload: NewTimeEntry;
    }
  | {
      type: 'CONTINUE';
      payload: NewTimeEntry;
    }
  | {
      type: 'STOP';
    }
  | { type: 'RESET' }
  | { type: 'REFETCH_ENTRIES' }
  | {
      type: 'MODE.TOGGLE';
    };

const newTimeEntry = {
  start: '',
  description: '',
  projectId: '',
  billable: false,
  tagIds: [],
};

export const timerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdGzuqEANmAMQDKAKgIIBKVA2gAwC6ioADgPayprcAdhxAAPRACYALAEYcAZgAcMgKzN5zGQDYZE7VoA0IAJ6J5ATnk5mWrVOaKd5meamWAvu6P5seDL6JSMgBhAHkAOSoASXCAVQBRFnYkEB4+AWEU8QRpOSVVdU0dPVsjUxzLHAB2ZQlXRXNzCS1FKS1Pb39cH1wsAFdBQVRBKDJo4IBpJJE0-lQhEWypKSsJDVlFRXk680UJMskqlRxl+XktbZ0dBqqOkB6-Ahx+weHR6lCABWmU2YzFxA6KTWKrMNZqeQqOzNA4ICxWGx2BxOFxueR3B4PWAAQwAbm8yHR4gAxeJUYIACQA+vFInQovEKD8uLw5gssoh6idzFUNDIqjUHALYbItNUZJttpDHFoVBIMV1Hr4sGAAGZgZAAYwAFgSiRQyczUqz-hyEDJ1FUFFI1MwHMsaipFLDVFZzCp5DIJStVCo-VIFU90NwIGAlVgyABZUIAEXiOCooQA4kmADKJNgzE3zTKgbLaRQ4OWNeRVXTOFT2QwmQFaK12WVnT0NPSKQO+YOhnDobGCPrY4hR2PxxMp9NGv45gHmlpFnal8uqKuwnTHWxaZgrWWKKruzxeECCENwESYxWBMBZ9JTs1VfY1uFacw4XbSJ2yC2llTt7qKl5DEYrzZXMxDMLYcAkBpNyhRQ7WUHdYVLZ870UD0lBUCU73lA8zyeHF8UA35s3ZPNEDvZ9zBaOtYNQ0sbEQyoJGkBsLGYDDGh-cNnjVDUdTeIDTVI80ZDaHAtEggU3BtOU7EQ3cFEov0GlaUVsM6J4egEm8hOkFdgR5RtIK9J8qikNscMVTsw00ojrxI0CEDvFc9BfSjdBkzZtDU+5LOPbte37YgtPs7J5FkHARJsNYWmYSw2hUZzgTcYoPOUcTOKs4KQOyXSHxksSGgw+1QQMn8sunABaXLyiq4E7XqhrGtufcgA */
  createMachine<TimerContext, TimerEvent>(
    {
      context: { workspaceId: '', userId: '', newTimeEntry, duration: 0 },
      predictableActionArguments: true,
      id: 'timer',
      type: 'parallel',
      states: {
        timer: {
          initial: 'idle',
          states: {
            idle: {
              entry: 'reset',
              on: {
                START: {
                  target: 'running',
                  actions: assign({
                    newTimeEntry: (_, event) => event.payload,
                  }),
                },
                CONTINUE: {
                  target: 'running',
                  actions: assign({
                    newTimeEntry: (_, event) => event.payload,
                  }),
                },
              },
            },
            running: {
              invoke: [
                {
                  src: 'updateTimer',
                },
                {
                  src: 'createTimeEntry',
                },
              ],
              on: {
                TICK: {
                  actions: assign({
                    duration: context => {
                      if (context.newTimeEntry) {
                        return differenceInSeconds(
                          new Date(),
                          new Date(context.newTimeEntry.start),
                        );
                      }
                      return 0;
                    },
                  }),
                },
                STOP: {
                  target: 'saving',
                  actions: assign({
                    newTimeEntry: _ => newTimeEntry,
                  }),
                },
              },
            },
            saving: {
              invoke: {
                src: 'stopTimeEntry',
              },
              on: {
                REFETCH_ENTRIES: {
                  target: 'refetching',
                },
              },
            },
            refetching: {
              invoke: {
                src: 'refetch',
              },
              on: {
                RESET: {
                  target: 'idle',
                },
              },
            },
          },
        },
        mode: {
          initial: 'timer',
          states: {
            timer: {
              on: {
                'MODE.TOGGLE': {
                  target: 'manual',
                },
              },
            },
            manual: {
              on: {
                'MODE.TOGGLE': {
                  target: 'timer',
                },
              },
            },
          },
        },
      },
    },
    {
      services: {
        updateTimer: () => send => {
          const interval = setInterval(() => send('TICK'), 1000);
          send('TICK');
          return () => {
            clearInterval(interval);
          };
        },
        createTimeEntry: context => () => {
          createTimeEntry(context.workspaceId, context.newTimeEntry);
        },
        stopTimeEntry: context => send => {
          stopTimeEntry(context.workspaceId, context.userId).then(() => {
            send('REFETCH_ENTRIES');
          });
        },
        refetch: context => send => {
          invariant(context.queryClient, 'Client must be provided');
          context.queryClient.invalidateQueries(['timeEntries']).then(() => {
            send('RESET');
          });
        },
      },
      actions: {
        reset: assign({
          duration: _ => 0,
          newTimeEntry: _ => newTimeEntry,
        }),
      },
    },
  );
