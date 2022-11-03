import { format, isSameWeek } from 'date-fns';
import { isSameDay } from 'date-fns/fp';
import { ReportedDay } from 'features/timer/components/ReportedDays';
import { TimeEntriesReportedDays } from 'features/timer/containers/TimeEntriesReportedDays';
import { Timer } from 'features/timer/containers/Timer';
import { TimerMachineProvider } from 'features/timer/machines/TimerMachineProvider';
import {
  InactiveTimeEntry,
  isActiveTimeEntry,
  isInactiveTimeEntry,
  TimeEntry,
} from 'features/timer/models/time-entry';
import { timeEntryDuration } from 'features/timer/utils/time-entries-utils';

export type TimeEntriesProps = {
  timeEntries: TimeEntry[];
};

function calculateDuration(timeEntries: InactiveTimeEntry[]): number {
  return timeEntries.map(timeEntryDuration).reduce((acc, val) => acc + val, 0);
}

function getStartDays(timeEntry: InactiveTimeEntry[]): string[] {
  return timeEntry.map(({ start }) => format(start, 'PP'));
}

function getReportedDays(
  timeEntries: InactiveTimeEntry[],
  dates: string[],
): ReportedDay[] {
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

function weekDuration(timeEntries: InactiveTimeEntry[]): number {
  const data = timeEntries.filter(timeEntry =>
    isSameWeek(new Date(timeEntry.start), new Date(), {
      weekStartsOn: 1,
    }),
  );
  return calculateDuration(data);
}

function reportedDays(timeEntries: InactiveTimeEntry[]) {
  return getReportedDays(timeEntries, [...new Set(getStartDays(timeEntries))]);
}

export const TimeEntries = (props: TimeEntriesProps) => {
  const inactiveTimeEntries = props.timeEntries.filter(isInactiveTimeEntry);

  const activeTimeEntry = props.timeEntries.find(isActiveTimeEntry);

  return (
    <TimerMachineProvider activeTimeEntry={activeTimeEntry}>
      <Timer />
      <TimeEntriesReportedDays
        weekDuration={weekDuration(inactiveTimeEntries)}
        reportedDays={reportedDays(inactiveTimeEntries)}
      />
    </TimerMachineProvider>
  );
};
