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
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as M from 'fp-ts/lib/Monoid';
import * as N from 'fp-ts/lib/number';
import * as S from 'fp-ts/lib/string';
import React from 'react';

export type TimeEntriesProps = {
  timeEntries: TimeEntry[];
};

function calculateDuration(timeEntries: InactiveTimeEntry[]): number {
  return pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum));
}

function getStartDays(timeEntry: InactiveTimeEntry[]): string[] {
  return pipe(
    timeEntry,
    A.map(({ start }) => format(start, 'PP')),
  );
}

function getReportedDays(timeEntries: InactiveTimeEntry[]) {
  return (dates: string[]): ReportedDay[] =>
    pipe(
      dates,
      A.map(date => {
        const dayTimeEntries = timeEntries.filter(({ start }) =>
          isSameDay(start, new Date(date)),
        );
        return {
          id: date,
          date: new Date(date),
          reportedDuration: pipe(dayTimeEntries, calculateDuration),
          data: dayTimeEntries,
        };
      }),
    );
}

function weekDuration(timeEntries: InactiveTimeEntry[]): number {
  return pipe(
    timeEntries,
    A.filter(timeEntry =>
      isSameWeek(new Date(timeEntry.start), new Date(), {
        weekStartsOn: 1,
      }),
    ),
    calculateDuration,
  );
}

function reportedDays(timeEntries: InactiveTimeEntry[]) {
  return pipe(
    timeEntries,
    getStartDays,
    A.uniq(S.Eq),
    getReportedDays(timeEntries),
  );
}

export const TimeEntries: React.FC<TimeEntriesProps> = props => {
  const inactiveTimeEntries = pipe(
    props.timeEntries,
    A.filter(isInactiveTimeEntry),
  );
  const activeTimeEntry = pipe(
    props.timeEntries,
    A.findFirst(isActiveTimeEntry),
  );
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
