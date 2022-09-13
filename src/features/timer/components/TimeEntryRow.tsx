import { Checkbox } from 'components/Checkbox'
import { format } from 'date-fns'
import { TimeEntryRowData } from 'features/timer/components/ReportedDays'
import { FC } from 'react'
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntryRowProps = {
  timeEntry: TimeEntryRowData
  edit: boolean
  checked: boolean
  onCheckedChange: (timeEntryId: string) => void
}

const TimeEntryItem = styled.div`
  display: flex;
  padding: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.blueGrey1};
  }
`

const Description = styled.div``

const ProjectInfo = styled.div``

const Date = styled.div``

const Tags = styled.div``

const Tag = styled(BiPurchaseTag)``

const Billable = styled(BiDollar)``

const Play = styled(BiPlay)``

const Options = styled(BiDotsVerticalRounded)``

const Duration = styled.div``

const Left = styled.div`
  flex: 1;
`
const Right = styled.div`
  display: flex;
`

export const TimeEntryRow: FC<TimeEntryRowProps> = props => {
  return (
    <TimeEntryItem key={props.timeEntry.id}>
      {props.edit && (
        <div
          css={`
            margin-right: 1rem;
          `}
        >
          <Checkbox
            checked={props.checked}
            onChange={() => props.onCheckedChange(props.timeEntry.id)}
          />
        </div>
      )}
      <Left>
        <Description>{props.timeEntry.description}</Description>
        <ProjectInfo>
          {props.timeEntry.project.name} {props.timeEntry.project.clientName}
        </ProjectInfo>
      </Left>
      <Right>
        <Tags>
          <Tag />
        </Tags>
        <Billable>$</Billable>
        <Date>
          {format(props.timeEntry.start, 'p')} -{' '}
          {format(props.timeEntry.end, 'p')}
        </Date>
        <Duration>{props.timeEntry.duration}</Duration>
        <Play />
        <Options />
      </Right>
    </TimeEntryItem>
  )
}
