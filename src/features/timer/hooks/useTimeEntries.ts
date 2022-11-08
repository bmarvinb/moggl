import { useQuery } from '@tanstack/react-query';
import { useCurrentUser, useWorkspace } from 'features/auth';
import {
  isActiveTimeEntry,
  isCompletedTimeEntry,
  toTimeEntry,
} from '../types/time-entry';
import { timeEntries } from '../api/timer-api';

export const timeEntriesQueryKey = 'timeEntries';

export function useTimeEntries() {
  const workspace = useWorkspace();
  const currentUser = useCurrentUser();
  return useQuery([timeEntriesQueryKey], async () => {
    const data = await timeEntries.getAll(workspace.id, currentUser.id, {
      'page-size': 25,
      page: 1,
    });
    const entries = data.map(toTimeEntry);
    const active = entries.find(isActiveTimeEntry);
    const completed = entries.filter(isCompletedTimeEntry);
    return { active, completed };
  });
}
