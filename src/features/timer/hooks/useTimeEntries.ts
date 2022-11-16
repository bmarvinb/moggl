import { useQuery } from '@tanstack/react-query';
import { useCurrentUser, useWorkspace } from 'features/auth';
import { timeEntries } from '../api';
import {
  ActiveTimeEntry,
  CompletedTimeEntry,
  isActiveTimeEntry,
  isCompletedTimeEntry,
  toTimeEntry,
} from '../types/time-entry';

export const timeEntriesQueryKey = 'timeEntries';

export type TimeEntries = {
  active: ActiveTimeEntry | undefined;
  completed: CompletedTimeEntry[];
};

export function useTimeEntries() {
  const workspace = useWorkspace();
  const currentUser = useCurrentUser();
  return useQuery<TimeEntries, string>([timeEntriesQueryKey], async () => {
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
