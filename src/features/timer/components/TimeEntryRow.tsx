import { Checkbox, IconButton } from 'components'
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
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid var(--neutral1);
  }
`

const Description = styled.div<{ $empty: boolean }>`
  line-height: var(--lineHeightLg);
  margin-bottom: 0.5rem;
  color: ${props => (props.$empty ? 'var(--neutral6)' : 'var(--neutral9)')};
`

const AdditionalInfo = styled.div<{ $color: string }>`
  position: relative;
  color: ${props => props.$color};
  padding-left: 0.75rem;
  font-size: var(--fontSizeSm);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:before {
    position: absolute;
    content: '';
    width: 0.3rem;
    height: 0.3rem;
    background: ${props => props.$color};
    border-radius: 100%;
    top: calc(50% - 0.15rem);
    left: -0rem;
  }
`

const Date = styled.div`
  display: none;
`

const TagIcon = styled(BiPurchaseTag)`
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
`

const BillableIcon = styled(BiDollar)`
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
`

const PlayIcon = styled(BiPlay)`
  font-size: var(--fontSizeXl);
`

const DotsIcon = styled(BiDotsVerticalRounded)`
  font-size: var(--fontSizeXl);
`

const Duration = styled.div`
  font-weight: 500;
  line-height: var(--lineHeightLg);
`

function formatDate(timeEntry: TimeEntryRowData): string {
  return `${format(timeEntry.start, 'p')} - ${format(timeEntry.end, 'p')}`
}

function formatAdditionalInfo(timeEntry: TimeEntryRowData): string {
  const { task, project } = timeEntry
  if (task && project.clientName) {
    return `${project.name}: ${task}, ${project.clientName}`
  }
  if (task) {
    return `${project.name}: ${task}`
  }
  if (project.clientName) {
    return `${project.name}, ${project.clientName}`
  }
  return `${project.name}`
}

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
      <div
        css={`
          width: 50%;

          @media ${screen.xs} {
            width: 60%;
          }
        `}
      >
        <Description $empty={props.timeEntry.description.length === 0}>
          {props.timeEntry.description || 'Add description'}
        </Description>
        <AdditionalInfo $color={props.timeEntry.project.color}>
          {formatAdditionalInfo(props.timeEntry)}
        </AdditionalInfo>
      </div>
      <div>
        <div
          css={`
            display: flex;
            margin-bottom: 0.5rem;
            justify-content: right;
          `}
        >
          <IconButton
            aria-label="tags"
            css={`
              margin-right: 0.5rem;
            `}
          >
            <TagIcon />
          </IconButton>
          <IconButton
            aria-label="billable"
            css={`
              margin-right: 0.5rem;
            `}
          >
            <BillableIcon />
          </IconButton>
          <Date>{formatDate(props.timeEntry)}</Date>
          <Duration>{props.timeEntry.duration}</Duration>
        </div>

        <div
          css={`
            display: flex;
            justify-content: right;
            position: relative;
          `}
        >
          <IconButton
            aria-label="start"
            css={`
              margin-right: 0.5rem;
            `}
          >
            <PlayIcon />
          </IconButton>
          <IconButton aria-label="actions">
            <DotsIcon />
          </IconButton>
        </div>
      </div>
    </TimeEntryItem>
  )
}
