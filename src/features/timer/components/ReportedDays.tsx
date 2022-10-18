import { Box } from 'common/components/Box';
import { isToday } from 'date-fns';
import { TimeEntriesTable } from 'features/timer/containers/TimeEntriesTable';
import {
  ActiveTimeEntryModel,
  InactiveTimeEntryModel,
} from 'features/timer/models/time-entries';
import { timeEntryDuration } from 'features/timer/utils/time-entries-utils';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { FC } from 'react';

export type TimeEntryRowProject = {
  name: string;
  color: string;
  clientName: O.Option<string>;
};

export type TimeEntryViewModel = {
  id: string;
  description: string;
  billable: boolean;
  project: O.Option<TimeEntryRowProject>;
  task: O.Option<string>;
  start: Date;
  end: Date;
  duration: number;
};

export type ReportedDay = {
  id: string;
  date: Date;
  reportedDuration: number;
  data: TimeEntryViewModel[];
};

export type ReportedDaysProps = {
  reportedDays: ReportedDay[];
  activeTimeEntry: O.Option<ActiveTimeEntryModel>;
};

export function createTimeEntryViewModel(
  timeEntry: InactiveTimeEntryModel,
): TimeEntryViewModel {
  return {
    id: timeEntry.id,
    description: timeEntry.description,
    billable: timeEntry.billable,
    project: pipe(
      timeEntry.project,
      O.fromNullable,
      O.map(project => {
        return {
          name: project.name,
          color: project.color,
          clientName: pipe(
            project.clientName,
            O.fromNullable,
            O.chain(clientName =>
              clientName.length === 0 ? O.none : O.some(clientName),
            ),
          ),
        };
      }),
    ),
    task: pipe(
      timeEntry.task,
      O.fromNullable,
      O.map(({ name }) => name),
    ),
    start: new Date(timeEntry.timeInterval.start),
    end: new Date(timeEntry.timeInterval.end),
    duration: pipe(timeEntry, timeEntryDuration),
  };
}

export const ReportedDays: FC<ReportedDaysProps> = props => {
  return (
    <Box
      css={{
        color: '$neutral9',
      }}
    >
      {props.reportedDays.map(
        ({ id, date, reportedDuration, data: timeEntries }) => (
          <TimeEntriesTable
            key={id}
            activeTimeEntry={isToday(date) ? props.activeTimeEntry : O.none}
            date={date}
            data={timeEntries}
            reportedDuration={reportedDuration}
          />
        ),
      )}
    </Box>
  );
};
