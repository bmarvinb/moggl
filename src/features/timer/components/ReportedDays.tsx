import { isToday } from 'date-fns'
import { TimeEntriesTable } from 'features/timer/containers/TimeEntriesTable'
import {
  ActiveTimeEntry,
  InactiveTimeEntry,
} from 'features/timer/types/time-entries'
import { timeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'

export type TimeEntryRowProject = {
  name: string
  color: string
  clientName: O.Option<string>
}

export type TimeEntryViewModel = {
  id: string
  description: string
  billable: boolean
  project: TimeEntryRowProject
  task: O.Option<string>
  start: Date
  end: Date
  duration: number
}

export type ReportedDay = {
  id: string
  date: Date
  reportedTime: number
  data: TimeEntryViewModel[]
}

export type ReportedDaysProps = {
  reportedDays: ReportedDay[]
  activeTimeEntry: O.Option<ActiveTimeEntry>
}

export function createTimeEntryViewModel(
  timeEntry: InactiveTimeEntry,
): TimeEntryViewModel {
  return {
    id: timeEntry.id,
    description: timeEntry.description,
    billable: timeEntry.billable,
    project: {
      name: timeEntry.project.name,
      color: timeEntry.project.color,
      clientName: pipe(
        timeEntry.project.clientName,
        O.fromNullable,
        O.chain(clientName =>
          clientName.length === 0 ? O.none : O.some(clientName),
        ),
      ),
    },
    task: pipe(
      timeEntry.task,
      O.fromNullable,
      O.map(({ name }) => name),
    ),
    start: new Date(timeEntry.timeInterval.start),
    end: new Date(timeEntry.timeInterval.end),
    duration: pipe(timeEntry, timeEntryDuration),
  }
}

export const ReportedDays: FC<ReportedDaysProps> = props => {
  return (
    <div
      css={`
        padding: 0 1rem;
        color: var(--neutral9);
        padding-bottom: 2rem;
      `}
    >
      {props.reportedDays.map(
        ({ id, date, reportedTime, data: timeEntries }) => (
          <TimeEntriesTable
            key={id}
            date={date}
            reportedTime={reportedTime}
            data={timeEntries}
            activeTimeEntry={isToday(date) ? props.activeTimeEntry : O.none}
          />
        ),
      )}
    </div>
  )
}
