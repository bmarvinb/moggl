import { useQueryClient } from '@tanstack/react-query';
import { useInterpret } from '@xstate/react';
import { invariant } from 'common/utils/invariant';
import React from 'react';
import { InterpreterFrom } from 'xstate';
import { useAddTimeEntry } from '../../hooks/useCreateTimeEntry';
import { useDeleteTimeEntry } from '../../hooks/useDeleteTimeEntry';
import { useStopTimeEntry } from '../../hooks/useStopTimeEntry';
import { useUpdateTimeEntry } from '../../hooks/useUpdateTimeEntry';
import { timerMachine } from './timerMachine';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

export const TimerContext = React.createContext<TimerContextData | undefined>(
  undefined,
);

export function TimerMachineProvider(props: { children: React.ReactNode }) {
  const timerMachineService = useSetupTimerService();

  return (
    <TimerContext.Provider value={timerMachineService}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimerService() {
  const service = React.useContext(TimerContext);
  if (service === undefined) {
    throw new Error(
      'useTimerService should be used inside TimerMachineProvider',
    );
  }
  return service;
}

function useSetupTimerService() {
  const queryClient = useQueryClient();
  const addTimeEntry = useAddTimeEntry();
  const stopTimeEntry = useStopTimeEntry();
  const updateTimeEntry = useUpdateTimeEntry();
  const deleteTimeEntry = useDeleteTimeEntry();

  const service = useInterpret(timerMachine, {
    services: {
      addTimeEntry: context => () => {
        invariant(context.start, 'Start date should be provided');
        return addTimeEntry
          .mutateAsync({
            start: context.start.toISOString(),
            projectId: context.timeEntry.projectId,
            description: context.timeEntry.description,
            billable: context.timeEntry.billable,
          })
          .then(({ id }) => id);
      },
      stopTimeEntry: context => () => {
        invariant(context.start, 'Start must be provided');
        return stopTimeEntry.mutateAsync({
          start: context.start,
          description: context.timeEntry.description,
          billable: context.timeEntry.billable,
        });
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
        invariant(context.start, 'Start must be provided');
        return updateTimeEntry.mutateAsync(
          {
            id: context.id,
            data: {
              start: context.start.toISOString(),
              billable: context.timeEntry.billable,
              projectId: context.timeEntry.projectId || undefined,
              description: context.timeEntry.description,
            },
          },
          // TODO: popup notifications
          {
            onSuccess: () => console.log('Time entry updated'),
            onError: () => console.error('Time entry update failed'),
          },
        );
      },
    },
  });

  return service;
}
