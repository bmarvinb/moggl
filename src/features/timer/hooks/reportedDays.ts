import { format, isSameDay } from 'date-fns';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import { calculateDuration } from 'features/timer/utils/time-entries-utils';

function getStartDays(timeEntry: CompletedTimeEntry[]): string[] {
  return timeEntry.map(({ start }) => format(start, 'PP'));
}

export type ReportedDay = {
  id: string;
  date: Date;
  reportedDuration: number;
  data: CompletedTimeEntry[];
};

export function useReportedDays(
  timeEntries: CompletedTimeEntry[],
): ReportedDay[] {
  const dates = [...new Set(getStartDays(timeEntries))];
  return dates.map(date => {
    const dayTimeEntries = timeEntries.filter(({ start }) =>
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
