import { isSameWeek } from 'date-fns';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import { calculateDuration } from 'features/timer/utils/time-entries-utils';

export function useWeekDuration(completed: CompletedTimeEntry[]): number {
  const fromWeek = completed.filter(timeEntry =>
    isSameWeek(new Date(timeEntry.start), new Date(), {
      weekStartsOn: 1,
    }),
  );
  return calculateDuration(fromWeek);
}
