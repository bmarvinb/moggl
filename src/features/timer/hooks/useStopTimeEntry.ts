import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invariant } from 'common/utils/invariant';
import { differenceInSeconds } from 'date-fns';
import { useCurrentUser, useWorkspace } from 'features/auth';
import { timeEntries } from '../api';
import { ActiveTimeEntry, CompletedTimeEntry } from '../types/time-entry';
import { timeEntriesQueryKey } from './useTimeEntries';

function createCompletedTimeEntry(data: {
  start: Date;
  description: string;
  billable: boolean;
}): CompletedTimeEntry {
  return {
    type: 'COMPLETED',
    id: `${data.start}`,
    description: data.description,
    billable: data.billable,
    start: new Date(data.start),
    end: new Date(),
    tags: [],
    project: undefined,
    task: undefined,
    duration: differenceInSeconds(new Date(), new Date(data.start)),
  };
}

export function useStopTimeEntry() {
  const workspace = useWorkspace();
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation(
    (data: { start: Date; description: string; billable: boolean }) =>
      timeEntries.stop(workspace.id, user.id),
    {
      onMutate: async data => {
        invariant(data.start, 'Start date should be provided');
        await queryClient.cancelQueries([timeEntriesQueryKey]);
        const cachedTimeEntries = queryClient.getQueryData([
          timeEntriesQueryKey,
        ]);
        const { start, description, billable } = data;
        const timeEntry = createCompletedTimeEntry({
          start,
          description,
          billable,
        });
        queryClient.setQueryData([timeEntriesQueryKey], data => {
          // TODO: refactor
          const value = data as {
            completed: CompletedTimeEntry[];
            active: ActiveTimeEntry;
          };
          return { ...value, completed: [timeEntry, ...value.completed] };
        });
        return { cachedTimeEntries };
      },
      onError: (_, __, context) => {
        if (context?.cachedTimeEntries) {
          queryClient.setQueryData(
            [timeEntriesQueryKey],
            context.cachedTimeEntries,
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([timeEntriesQueryKey]);
      },
    },
  );
}
