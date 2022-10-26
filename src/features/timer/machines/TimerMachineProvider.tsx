import { useQueryClient } from '@tanstack/react-query';
import { useActor, useInterpret } from '@xstate/react';
import { useAddTimeEntry } from 'features/timer/hooks/createTimeEntry';
import { useDeleteTimeEntry } from 'features/timer/hooks/deleteTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/stopTimeEntry';
import { useUpdateTimeEntry } from 'features/timer/hooks/updateTimeEntry';
import { timerMachine } from 'features/timer/machines/TimerMachine';
import { ActiveTimeEntry } from 'features/timer/models/time-entry';
import { constUndefined, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';
import { invariant } from 'shared/utils/invariant';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerMachineProvider(props: {
  activeTimeEntry: O.Option<ActiveTimeEntry>;
  children: React.ReactNode;
}) {
  const addTimeEntry = useAddTimeEntry();
  const stopTimeEntry = useStopTimeEntry();
  const updateTimeEntry = useUpdateTimeEntry();
  const deleteTimeEntry = useDeleteTimeEntry();
  const queryClient = useQueryClient();

  const service = useInterpret(timerMachine, {
    services: {
      addTimeEntry: context => () => {
        invariant(context.start, 'Start date should be provided');
        return addTimeEntry
          .mutateAsync({
            start: context.start,
            projectId: context.timeEntry.projectId,
            description: context.timeEntry.description,
            billable: context.timeEntry.billable,
          })
          .then(res => {
            return res.id;
          });
      },
      stopTimeEntry: () => () => {
        return stopTimeEntry.mutateAsync();
      },
      discard: context => () => {
        invariant(context.id, 'Id must be provided');
        return deleteTimeEntry.mutateAsync(context.id);
      },
    },
    actions: {
      refetchTimeEntries: _ => {
        return queryClient.invalidateQueries(['timeEntries']);
      },
      updateTimeEntry: context => {
        invariant(context.id, 'Id must be provided');
        return updateTimeEntry.mutateAsync(
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
    if (O.isSome(props.activeTimeEntry)) {
      timerSend({
        type: 'CONTINUE',
        data: {
          id: props.activeTimeEntry.value.id,
          start: props.activeTimeEntry.value.start,
          timeEntry: {
            projectId: pipe(
              props.activeTimeEntry,
              O.map(project => project.id),
              O.getOrElseW(constUndefined),
            ),
            description: props.activeTimeEntry.value.description,
            billable: props.activeTimeEntry.value.billable,
          },
        },
      });
    }
  }, [props.activeTimeEntry, timerSend]);

  return (
    <TimerContext.Provider value={service}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimerMachine() {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error(
      `useTimerMachine must be used within a TimerMachineProvider`,
    );
  }
  return context;
}
