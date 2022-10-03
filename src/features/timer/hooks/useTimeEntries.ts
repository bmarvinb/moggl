import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from 'features/auth';
import { getTimeEntries } from 'features/timer/services/time-entries-api';
import * as O from 'fp-ts/lib/Option';

export function useTimeEntries() {
  const userInfo = useUserInfo();
  if (O.isNone(userInfo)) {
    throw new Error('Unauthorized user');
  }
  return useQuery(['timeEntries'], () =>
    getTimeEntries(userInfo.value.workspace.id, userInfo.value.user.id, {
      'page-size': 25,
      page: 1,
    }),
  );
}
