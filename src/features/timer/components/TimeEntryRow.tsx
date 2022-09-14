import { Checkbox } from 'components'
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
import { screen } from 'theme/index'

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
    border-bottom: 1px solid var(--neutral1);
  }
`

const Description = styled.div<{ $empty: boolean }>`
  line-height: var(--lineHeightLg);
  margin-bottom: 0.5rem;
  color: ${props => (props.$empty ? 'var(--neutral6)' : 'var(--neutral9)')};
`

const ProjectInfo = styled.div<{ $color?: string }>`
  position: relative;
  color: ${props => (props.$color ? props.$color : 'var(--neutral6)')};
  padding-left: 0.75rem;
  font-size: var(--fontSizeSm);

  &:before {
    position: absolute;
    content: '';
    width: 0.3rem;
    height: 0.3rem;
    background: ${props => (props.$color ? props.$color : 'var(--neutral6)')};
    border-radius: 100%;
    top: calc(50% - 0.15rem);
    left: -0rem;
  }
`

const Date = styled.div`
  display: none;
`

const Tag = styled(BiPurchaseTag)`
  margin-right: 0.5rem;
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
`

const Billable = styled(BiDollar)`
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
  margin-right: 0.5rem;
`

const Play = styled(BiPlay)`
  font-size: var(--fontSizeXl);
  margin-right: 0.5rem;
`

const Options = styled(BiDotsVerticalRounded)`
  font-size: var(--fontSizeXl);
`

const Duration = styled.div`
  font-weight: 500;
  line-height: var(--lineHeightLg);
`

const Left = styled.div`
  flex: 1;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: right;
`

export const TimeEntryRow: FC<TimeEntryRowProps> = props => {
  console.log('row render')

  return (
    <TimeEntryItem key={props.timeEntry.id}>
      {props.edit && (
        <div
          css={`
            margin-right: 1rem;
            display: flex;
            align-items: center;
          `}
        >
          <Checkbox
            checked={props.checked}
            onChange={() => props.onCheckedChange(props.timeEntry.id)}
          />
        </div>
      )}
      <Left>
        <Description $empty={props.timeEntry.description.length === 0}>
          {props.timeEntry.description || 'Add description'}
        </Description>
        <ProjectInfo $color={props.timeEntry.project.color}>
          {props.timeEntry.project.name}
        </ProjectInfo>
      </Left>
      <Right>
        <div
          css={`
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            justify-content: right;
          `}
        >
          <Tag />
          <Billable>$</Billable>
          <Date>
            {format(props.timeEntry.start, 'p')} -{' '}
            {format(props.timeEntry.end, 'p')}
          </Date>
          <Duration>{props.timeEntry.duration}</Duration>
        </div>

        <div
          css={`
            display: flex;
            justify-content: right;
          `}
        >
          <Play />
          <Options />
        </div>
      </Right>
    </TimeEntryItem>
  )
}
