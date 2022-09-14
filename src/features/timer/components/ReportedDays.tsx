import { TimeEntriesTable } from 'features/timer/components/TimeEntriesTable'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type TimeEntryRowData = {
  id: string
  description: string
  project: {
    name: string
    color: string
    clientName: string
  }
  start: Date
  end: Date
  duration: string
}

export type ReportedDay = {
  id: string
  date: Date
  totalTime: string
  timeEntries: TimeEntryRowData[]
}

export type ReportedDaysProps = {
  reportedDays: ReportedDay[]
}

const Container = styled.div`
  padding: 0 1rem;
  color: var(--neutral9);
  padding-bottom: 2rem;
`

export const ReportedDays: FC<ReportedDaysProps> = props => (
  <Container>
    {props.reportedDays.map(({ id, date, totalTime, timeEntries }) => (
      <TimeEntriesTable
        key={id}
        date={date}
        totalTime={totalTime}
        timeEntries={timeEntries}
      />
    ))}
  </Container>
)
