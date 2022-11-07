import { isSameWeek } from 'date-fns';
import { CompletedTimeEntry } from '../types/time-entry';
import { calculateDuration } from '../utils';

export function useWeekDuration(timeEntries: CompletedTimeEntry[]): number {
  const fromWeek = timeEntries.filter(timeEntry =>
    isSameWeek(new Date(timeEntry.start), new Date(), {
      weekStartsOn: 1,
    }),
  );
  return calculateDuration(fromWeek);
}
