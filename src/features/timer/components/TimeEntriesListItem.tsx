import { format } from 'date-fns'
import { ViewTimeEntry } from 'features/timer/components/TimeEntriesList'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type TimeEntriesListItemProps = {
  timeEntry: ViewTimeEntry
}

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

const Tags = styled.div``

const Billable = styled.div``

const Duration = styled.div``

const Left = styled.div`
  flex: 1;
`
const Right = styled.div`
  display: flex;
  width: 50%;
`

export const TimeEntriesListItem: FC<TimeEntriesListItemProps> = props => {
  return (
    <TimeEntryItem key={props.timeEntry.id}>
      <Left>
        <Description>{props.timeEntry.description}</Description>
        <ProjectInfo>
          {props.timeEntry.project.name} {props.timeEntry.project.clientName}
        </ProjectInfo>
      </Left>
      <Right>
        <Tags>Development, Production</Tags>
        <Billable>$</Billable>
        <Date>
          {format(props.timeEntry.start, 'p')} -{' '}
          {format(props.timeEntry.end, 'p')}
        </Date>
        <Duration>{props.timeEntry.duration}</Duration>
      </Right>
    </TimeEntryItem>
  )
}
