import { useQueryClient } from '@tanstack/react-query';
import { useActor, useInterpret } from '@xstate/react';
import { invariant } from 'common/utils/invariant';
import { useCreateTimeEntry } from 'features/timer/hooks/useCreateTimeEntry';
import { useDeleteTimeEntry } from 'features/timer/hooks/useDeleteTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/useStopTimeEntry';
import { useUpdateTimeEntry } from 'features/timer/hooks/useUpdateTimeEntry';
import { timerMachine } from 'features/timer/machines/TimerMachine';
import { NewTimeEntryModel } from 'features/timer/models/time-entries';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerMachineProvider(props: {
  newTimeEntry: O.Option<NewTimeEntryModel>;
  children: React.ReactNode;
}) {
  const { mutate: addTimeEntry } = useCreateTimeEntry();
  const { mutate: stopTimeEntry } = useStopTimeEntry();
  const { mutate: updateTimeEntry } = useUpdateTimeEntry();
  const { mutate: deleteTimeEntry } = useDeleteTimeEntry();
  const queryClient = useQueryClient();

  const service = useInterpret(timerMachine, {
    services: {
      addTimeEntry: context => send => {
        invariant(context.start, 'Start date should be provided');
        addTimeEntry(
          {
            start: context.start,
            projectId: context.timeEntry.projectId,
            description: context.timeEntry.description,
            billable: context.timeEntry.billable,
          },
          {
            onSuccess: () => send('START.SUCCESS'),
            onError: () => send('START.ERROR'),
          },
        );
      },
      stopTimeEntry: () => send => {
        stopTimeEntry(undefined, {
          onSuccess: async () => {
            await queryClient.invalidateQueries(['timeEntries']);
            send('SAVING.SUCCESS');
          },
          onError: () => send('SAVING.ERROR'),
        });
      },
      discard: context => send => {
        invariant(context.id, 'Id must be provided');
        deleteTimeEntry(context.id, {
          onSuccess: () => send('DISCARD.SUCCESS'),
          onError: () => send('DISCARD.ERROR'),
        });
      },
    },
    actions: {
      // TODO: cancel requests if they are not finished until new event occured
      updateTimeEntry: context => {
        invariant(context.id, 'Id must be provided');
        updateTimeEntry(
          {
            id: context.id,
            data: {
              start: context.start,
              billable: context.timeEntry.billable,
              projectId: context.timeEntry.projectId || undefined,
              description: context.timeEntry.description,
            },
          },
          {
            onSuccess: () => console.log('Time entry updated'),
            onError: () => console.error('Time entry update failed'),
          },
        );
      },
    },
  });

  const [timerState, timerSend] = useActor(service);

  useEffect(() => {
    if (O.isSome(props.newTimeEntry)) {
      timerSend({
        type: 'CONTINUE',
        data: {
          id: props.newTimeEntry.value.id,
          start: props.newTimeEntry.value.start,
          timeEntry: {
            description: props.newTimeEntry.value.description,
            projectId: props.newTimeEntry.value.projectId || undefined,
            billable: props.newTimeEntry.value.billable,
          },
        },
      });
    }
  }, [props.newTimeEntry, timerSend]);

  return (
    <TimerContext.Provider value={service}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimerMachine() {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error(`useTimer must be used within a TimerProvider`);
  }
  return context;
}
