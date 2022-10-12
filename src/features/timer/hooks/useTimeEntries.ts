import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from 'features/auth/hooks/useCurrentUser';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { getTimeEntries } from 'features/timer/services/time-entries-api';

export function useTimeEntries() {
  const workspace = useWorkspace();
  const currentUser = useCurrentUser();
  return useQuery(['timeEntries'], () =>
    getTimeEntries(workspace.id, currentUser.id, {
      'page-size': 25,
      page: 1,
    }),
  );
}
