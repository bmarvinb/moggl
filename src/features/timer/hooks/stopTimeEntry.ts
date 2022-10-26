import { useMutation, useQueryClient } from '@tanstack/react-query';
import { differenceInSeconds } from 'date-fns';
import { useCurrentUser } from 'features/auth/hooks/currentUser';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { QUERY_KEY } from 'features/timer/hooks/timeEntries';
import { InactiveTimeEntry, TimeEntry } from 'features/timer/models/time-entry';
import { timeEntries } from 'features/timer/services/time-entries';
import * as O from 'fp-ts/lib/Option';
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
        const timeEntry: TimeEntry = {
          type: 'INACTIVE',
          id: `${data.start}`,
          description: data.description,
          billable: data.billable,
          start: new Date(data.start),
          end: new Date(),
          tags: [],
          project: O.none,
          task: O.none,
          duration: differenceInSeconds(new Date(), new Date(data.start)),
        };
        await queryClient.cancelQueries([QUERY_KEY]);
        const previousTimeEntries = queryClient.getQueryData([QUERY_KEY]);
        queryClient.setQueryData(
          [QUERY_KEY],
          (previous: InactiveTimeEntry[] | undefined) => {
            return !previous ? [] : [timeEntry, ...previous];
          },
        );
        return { previousTimeEntries };
      },
      onError: (_, __, context) => {
        if (context?.previousTimeEntries) {
          queryClient.setQueryData([QUERY_KEY], context.previousTimeEntries);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_KEY]);
      },
    },
  );
}
