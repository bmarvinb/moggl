import { useQueryClient } from '@tanstack/react-query';
import { useActor, useInterpret } from '@xstate/react';
import { invariant } from 'common/utils/invariant';
import { useAddTimeEntry } from 'features/timer/hooks/useCreateTimeEntry';
import { useDeleteTimeEntry } from 'features/timer/hooks/useDeleteTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/useStopTimeEntry';
import { useUpdateTimeEntry } from 'features/timer/hooks/useUpdateTimeEntry';
import { timerMachine } from 'features/timer/machines/TimerMachine';
import { TimeEntryInProgressModel } from 'features/timer/models/time-entries';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerMachineProvider(props: {
  timeEntryInProgress: O.Option<TimeEntryInProgressModel>;
  children: React.ReactNode;
}) {
  const { mutate: addTimeEntry } = useAddTimeEntry();
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
            onSuccess: data => send({ type: 'CREATING.SUCCESS', id: data.id }),
            onError: () => send('CREATING.ERROR'),
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
    if (O.isSome(props.timeEntryInProgress)) {
      timerSend({
        type: 'CONTINUE',
        data: {
          id: props.timeEntryInProgress.value.id,
          start: props.timeEntryInProgress.value.timeInterval.start,
          timeEntry: {
            description: props.timeEntryInProgress.value.description,
            projectId: props.timeEntryInProgress.value.projectId || undefined,
            billable: props.timeEntryInProgress.value.billable,
          },
        },
      });
    }
  }, [props.timeEntryInProgress, timerSend]);

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
