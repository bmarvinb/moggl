import { format, isSameDay } from 'date-fns';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import { calculateDuration } from 'features/timer/utils/time-entries-utils';

function getStartDays(timeEntry: CompletedTimeEntry[]): string[] {
  return timeEntry.map(({ start }) => format(start, 'PP'));
}

export function useReportedDays(entries: CompletedTimeEntry[]) {
  const dates = [...new Set(getStartDays(entries))];
  return dates.map(date => {
    const dayTimeEntries = entries.filter(({ start }) =>
      isSameDay(start, new Date(date)),
    );
    return {
      id: date,
      date: new Date(date),
      reportedDuration: calculateDuration(dayTimeEntries),
      data: dayTimeEntries,
    };
  });
}
