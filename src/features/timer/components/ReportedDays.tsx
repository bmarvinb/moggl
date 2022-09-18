import { isToday } from 'date-fns'
import { TimeEntriesTable } from 'features/timer/containers/TimeEntriesTable'
import {
  ActiveTimeEntry,
  InactiveTimeEntry,
} from 'features/timer/services/time-entries'
import { timeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import { FC } from 'react'

export type TimeEntryRowProject = {
  name: string
  color: string
  clientName: string | undefined
}

export type TimeEntryViewModel = {
  id: string
  description: string
  billable: boolean
  project: TimeEntryRowProject
  task: string | undefined
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
  activeTimeEntry: ActiveTimeEntry | undefined
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
      clientName: timeEntry.project.clientName || undefined,
    },
    task: timeEntry.task?.name || undefined,
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
            activeTimeEntry={isToday(date) ? props.activeTimeEntry : undefined}
          />
        ),
      )}
    </div>
  )
}
