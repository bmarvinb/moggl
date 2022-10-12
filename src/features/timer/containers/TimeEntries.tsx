import { PageSpinner } from 'common/components/PageSpinner';
import { format, isSameWeek } from 'date-fns';
import { isSameDay } from 'date-fns/fp';
import {
  createTimeEntryViewModel,
  ReportedDay,
} from 'features/timer/components/ReportedDays';
import { TimeEntriesContent } from 'features/timer/containers/TimeEntriesContent';
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries';
import { InactiveTimeEntry } from 'features/timer/models/time-entries';
import {
  isActiveTimeEntry,
  isInactiveTimeEntry,
  timeEntryDuration,
} from 'features/timer/utils/time-entries-utils';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as M from 'fp-ts/lib/Monoid';
import * as N from 'fp-ts/lib/number';
import * as S from 'fp-ts/lib/string';

function getStartDays(timeEntry: InactiveTimeEntry[]): string[] {
  return pipe(
    timeEntry,
    A.map(({ timeInterval }) => format(new Date(timeInterval.start), 'PP')),
  );
}

function calculateDuration(timeEntries: InactiveTimeEntry[]): number {
  return pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum));
}

function getReportedDays(timeEntries: InactiveTimeEntry[]) {
  return (dates: string[]): ReportedDay[] =>
    pipe(
      dates,
      A.map(date => {
        const dayTimeEntries = timeEntries.filter(({ timeInterval }) =>
          isSameDay(new Date(timeInterval.start), new Date(date)),
        );
        return {
          id: date,
          date: new Date(date),
          reportedDuration: pipe(dayTimeEntries, calculateDuration),
          data: pipe(dayTimeEntries, A.map(createTimeEntryViewModel)),
        };
      }),
    );
}

export const TimeEntries = () => {
  const { status, data } = useTimeEntries();
  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      const timeEntries = pipe(data, A.filter(isInactiveTimeEntry));
      const activeTimeEntry = pipe(timeEntries, A.findFirst(isActiveTimeEntry));
      const weekDuration = pipe(
        timeEntries,
        A.filter(({ timeInterval }) =>
          isSameWeek(new Date(timeInterval.start), new Date(), {
            weekStartsOn: 1,
          }),
        ),
        calculateDuration,
      );
      const reportedDays = pipe(
        timeEntries,
        getStartDays,
        A.uniq(S.Eq),
        getReportedDays(timeEntries),
      );
      return (
        <TimeEntriesContent
          activeTimeEntry={activeTimeEntry}
          weekDuration={weekDuration}
          reportedDays={reportedDays}
        />
      );
  }
};
