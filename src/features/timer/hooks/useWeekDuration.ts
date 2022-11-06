import { isSameWeek } from 'date-fns';
import { CompletedTimeEntry } from '../models/time-entry';
import { calculateDuration } from '../utils/time-entries-utils';

export function useWeekDuration(timeEntries: CompletedTimeEntry[]): number {
  const fromWeek = timeEntries.filter(timeEntry =>
    isSameWeek(new Date(timeEntry.start), new Date(), {
      weekStartsOn: 1,
    }),
  );
  return calculateDuration(fromWeek);
}
