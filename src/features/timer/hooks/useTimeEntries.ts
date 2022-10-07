import { useQuery } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { getTimeEntries } from 'features/timer/services/time-entries-api';

export function useTimeEntries() {
  const userInfo = useAuthorizedUserInfo();
  return useQuery(['timeEntries'], () =>
    getTimeEntries(userInfo.workspace.id, userInfo.user.id, {
      'page-size': 25,
      page: 1,
    }),
  );
}
