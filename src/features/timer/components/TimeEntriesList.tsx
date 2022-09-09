import { format, isToday, isYesterday } from 'date-fns'
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
  background: ${props => props.theme.pallete.blueGrey0};
  color: ${props => props.theme.pallete.blueGrey9};
`

const List = styled.div`
  margin-bottom: 2rem;
  background: ${props => `#fff`};
  border-radius: 4px;
  box-shadow: ${props => props.theme.pallete.shadow};
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 1.25rem;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.textSm.fontSize};
  line-height: ${({ theme }) => theme.typography.textSm.lineHeight};
  font-weight: 500;
`

const TimeEntries = styled.div``

const TimeEntryItem = styled.div`
  display: flex;
  padding: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.pallete.blueGrey1};
  }
`

const Description = styled.div``

const ProjectInfo = styled.div``

const Date = styled.div``

const Duration = styled.div``

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
  console.log(props)

  return (
    <Container>
      {props.groupedTimeEntries.map(({ id, date, totalTime, timeEntries }) => (
        <List key={id}>
          <Top>
            <Label>{formatDate(date)}</Label>
            <Label>{totalTime}</Label>
          </Top>
          <TimeEntries>
            {timeEntries.map(timeEntry => (
              <TimeEntryItem key={timeEntry.id}>
                <Description>{timeEntry.description}</Description>
                <ProjectInfo>
                  {timeEntry.project.name} {timeEntry.project.clientName}
                </ProjectInfo>
                <Date>
                  {format(timeEntry.start, 'p')} - {format(timeEntry.end, 'p')}
                </Date>
                <Duration>{timeEntry.duration}</Duration>
              </TimeEntryItem>
            ))}
          </TimeEntries>
        </List>
      ))}
    </Container>
  )
}
