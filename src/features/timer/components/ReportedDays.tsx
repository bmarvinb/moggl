import { TimeEntriesTable } from 'features/timer/components/TimeEntriesTable'
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
  totalTime: number
  data: TimeEntryViewModel[]
}

export type ReportedDaysProps = {
  reportedDays: ReportedDay[]
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
      {props.reportedDays.map(({ id, date, totalTime, data: timeEntries }) => (
        <TimeEntriesTable
          key={id}
          date={date}
          totalTime={totalTime}
          data={timeEntries}
        />
      ))}
    </div>
  )
}
