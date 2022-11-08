import { useQuery } from '@tanstack/react-query';
import { useCurrentUser, useWorkspace } from 'features/auth';
import {
  ActiveTimeEntry,
  CompletedTimeEntry,
  isActiveTimeEntry,
  isCompletedTimeEntry,
  TimeEntry,
  toTimeEntry,
} from '../types/time-entry';
import { timeEntries } from '../api/timer-api';
import { TimeEntryDTO } from '../api/timer-dtos';

export const timeEntriesQueryKey = 'timeEntries';

export function useTimeEntries() {
  const workspace = useWorkspace();
  const currentUser = useCurrentUser();
  return useQuery<
    TimeEntryDTO[],
    string,
    { active: ActiveTimeEntry | undefined; completed: CompletedTimeEntry[] }
  >(
    [timeEntriesQueryKey],
    async () => {
      return timeEntries.getAll(workspace.id, currentUser.id, {
        'page-size': 25,
        page: 1,
      });
    },
    {
      select: data => {
        const entries = data.map(toTimeEntry);
        const active = entries.find(isActiveTimeEntry);
        const completed = entries.filter(isCompletedTimeEntry);
        return { active, completed };
      },
    },
  );
}
