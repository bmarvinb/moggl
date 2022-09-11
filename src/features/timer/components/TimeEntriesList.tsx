import { isToday, isYesterday } from 'date-fns'
import { TimeEntriesListItem } from 'features/timer/components/TimeEntriesListItem'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type ViewTimeEntry = {
  id: string
  description: string
  project: {
    name: string
    clientName: string
  }
  start: Date
  end: Date
  duration: string
}

export type GroupedTimeEntries = {
  id: string
  date: Date
  totalTime: string
  timeEntries: ViewTimeEntry[]
}

export type TimeEntriesListProps = {
  groupedTimeEntries: GroupedTimeEntries[]
}

const Container = styled.div`
  padding: 0 1rem;
  color: ${props => props.theme.colors.blueGrey9};
  padding-bottom: 2rem;
`

const List = styled.div`
  margin-bottom: 2rem;
  background: ${props => `#fff`};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.shadowSm};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 1.25rem;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
  font-weight: 500;
`

function formatDate(date: Date): string {
  if (isToday(date)) {
    return 'Today'
  }
  if (isYesterday(date)) {
    return 'Yesterday'
  }
  return date.toLocaleDateString()
}

export const TimeEntriesList: FC<TimeEntriesListProps> = props => {
  return (
    <Container>
      {props.groupedTimeEntries.map(({ id, date, totalTime, timeEntries }) => (
        <List key={id}>
          <Header>
            <Label>{formatDate(date)}</Label>
            <Label>{totalTime}</Label>
          </Header>
          <div>
            {timeEntries.map(timeEntry => (
              <TimeEntriesListItem key={timeEntry.id} timeEntry={timeEntry} />
            ))}
          </div>
        </List>
      ))}
    </Container>
  )
}
