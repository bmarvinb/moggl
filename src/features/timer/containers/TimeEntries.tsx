import { format, isSameWeek } from 'date-fns';
import { isSameDay } from 'date-fns/fp';
import {
  createTimeEntryViewModel,
  ReportedDay,
} from 'features/timer/components/ReportedDays';
import { TimeEntriesReportedDays } from 'features/timer/containers/TimeEntriesReportedDays';
import { Timer } from 'features/timer/containers/Timer';
import {
  InactiveTimeEntryModel,
  NewTimeEntryModel,
  TimeEntriesModel,
} from 'features/timer/models/time-entries';
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
import * as O from 'fp-ts/lib/Option';
import { TimerProvider } from 'features/timer/providers/TimerProvider';

function calculateDuration(timeEntries: InactiveTimeEntryModel[]): number {
  return pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum));
}

function getStartDays(timeEntry: InactiveTimeEntryModel[]): string[] {
  return pipe(
    timeEntry,
    A.map(({ timeInterval }) => format(new Date(timeInterval.start), 'PP')),
  );
}

function getReportedDays(timeEntries: InactiveTimeEntryModel[]) {
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

function weekDuration(timeEntries: InactiveTimeEntryModel[]): number {
  return pipe(
    timeEntries,
    A.filter(timeEntry =>
      isSameWeek(new Date(timeEntry.timeInterval.start), new Date(), {
        weekStartsOn: 1,
      }),
    ),
    calculateDuration,
  );
}

function reportedDays(timeEntries: InactiveTimeEntryModel[]) {
  return pipe(
    timeEntries,
    getStartDays,
    A.uniq(S.Eq),
    getReportedDays(timeEntries),
  );
}

export const TimeEntries = (props: { timeEntries: TimeEntriesModel }) => {
  const timeEntries = pipe(props.timeEntries, A.filter(isInactiveTimeEntry));
  const activeTimeEntry = pipe(
    props.timeEntries,
    A.findFirst(isActiveTimeEntry),
  );
  const newTimeEntry: O.Option<NewTimeEntryModel> = pipe(
    activeTimeEntry,
    O.map(value => ({
      start: value.timeInterval.start,
      projectId: value.projectId,
      description: value.description,
      billable: value.billable,
      tagIds: value.tags.map(tag => tag.id),
    })),
  );
  return (
    <TimerProvider>
      <Timer newTimeEntry={newTimeEntry} />
      <TimeEntriesReportedDays
        activeTimeEntry={activeTimeEntry}
        weekDuration={weekDuration(timeEntries)}
        reportedDays={reportedDays(timeEntries)}
      />
    </TimerProvider>
  );
};
