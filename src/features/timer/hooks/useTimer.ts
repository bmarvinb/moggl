import { invariant } from '@remix-run/router';
import { useQueryClient } from '@tanstack/react-query';
import { useInterpret } from '@xstate/react';
import { timerMachine } from '../machines/TimerMachine';
import { useAddTimeEntry } from '../api/useCreateTimeEntry';
import { useDeleteTimeEntry } from '../api/useDeleteTimeEntry';
import { useStopTimeEntry } from './useStopTimeEntry';
import { useUpdateTimeEntry } from '../api/useUpdateTimeEntry';

export function useTimer() {
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
