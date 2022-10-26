import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from 'features/auth/hooks/currentUser';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { toTimeEntry } from 'features/timer/models/time-entry';
import { timeEntries } from 'features/timer/services/time-entries';

export const QUERY_KEY = 'timeEntries';

export function useTimeEntries() {
  const workspace = useWorkspace();
  const currentUser = useCurrentUser();
  return useQuery([QUERY_KEY], () =>
    timeEntries
      .getAll(workspace.id, currentUser.id, {
        'page-size': 25,
        page: 1,
      })
      .then(data => data.map(toTimeEntry)),
  );
}
