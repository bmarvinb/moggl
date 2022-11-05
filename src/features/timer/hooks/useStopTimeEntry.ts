import { useMutation, useQueryClient } from '@tanstack/react-query';
import { differenceInSeconds } from 'date-fns';
import { useCurrentUser } from 'features/auth/hooks/currentUser';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { QUERY_KEY } from 'features/timer/hooks/useTimeEntries';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import { timeEntries } from 'features/timer/services/time-entries';
import { invariant } from 'shared/utils/invariant';

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
        const timeEntry: CompletedTimeEntry = {
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
        await queryClient.cancelQueries([QUERY_KEY]);
        const prev = queryClient.getQueryData([QUERY_KEY]);
        queryClient.setQueryData([QUERY_KEY], (data: any) => {
          return { ...data, completed: [timeEntry, ...data.completed] };
        });
        return { prev };
      },
      onError: (_, __, context) => {
        if (context?.prev) {
          queryClient.setQueryData([QUERY_KEY], context.prev);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_KEY]);
      },
    },
  );
}