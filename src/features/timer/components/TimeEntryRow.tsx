import { Checkbox, IconButton } from 'components'
import { format } from 'date-fns'
import { TimeEntryRowData } from 'features/timer/components/ReportedDays'
import {
  formatDurationToInlineTime,
  isChildTimeEntry,
  isParentTimeEntry,
} from 'features/timer/utils/time-entries-utils'
import { FC, useReducer } from 'react'
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi'
import styled from 'styled-components/macro'

export const enum TimeEntryRowType {
  Regular = 'Regular',
  Parent = 'Parent',
  Child = 'Child',
}

type Common = {
  data: TimeEntryRowData
}

export type ParentTimeEntry = Common & {
  type: TimeEntryRowType.Parent
  children: ChildTimeEntry[]
}

export type RegularTimeEntry = Common & {
  type: TimeEntryRowType.Regular
}

export type ChildTimeEntry = Common & {
  type: TimeEntryRowType.Child
}

export type TimeEntryViewRow =
  | RegularTimeEntry
  | ParentTimeEntry
  | ChildTimeEntry

export type TimeEntryRowProps = {
  timeEntry: TimeEntryViewRow
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
  const [expanded, toggleExpanded] = useReducer(state => !state, false)

  return (
    <>
      <TimeEntryItem key={props.timeEntry.data.id}>
        <div
          css={`
            display: flex;
            flex-direction: row;
            padding-right: 0.5rem;
          `}
        >
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
                onChange={() => props.onCheckedChange(props.timeEntry.data.id)}
              />
            </div>
          )}
          {isParentTimeEntry(props.timeEntry) && (
            <div
              onClick={toggleExpanded}
              role="button"
              aria-label="expand"
              css={`
                margin-right: 1rem;
                display: flex;
                align-items: center;
                padding: 0.25rem;
                border: 1px solid var(--neutral7);
                border-radius: 100%;
                width: 2rem;
                height: 2rem;
                justify-content: center;
                text-align: center;
                margin: auto;
                margin-right: 1rem;
                font-size: var(--fontSizeSm);
                &:hover {
                  border-color: var(--primary4);
                  color: var(--primary4);
                  cursor: pointer;
                }
              `}
            >
              {props.timeEntry.children.length}
            </div>
          )}
          <div
            css={`
              display: flex;
              flex-direction: column;
              padding-left: ${isChildTimeEntry(props.timeEntry) ? '3rem' : '0'};
            `}
          >
            <Description $empty={props.timeEntry.data.description.length === 0}>
              {props.timeEntry.data.description || 'Add description'}
            </Description>
            <AdditionalInfo $color={props.timeEntry.data.project.color}>
              {formatAdditionalInfo(props.timeEntry.data)}
            </AdditionalInfo>
          </div>
        </div>
        <div>
          <div
            css={`
              display: grid;
              grid-template-columns: 2rem 2rem 1fr;
              grid-column-gap: 0.25rem;
            `}
          >
            <IconButton aria-label="tags">
              <TagIcon />
            </IconButton>
            <IconButton aria-label="billable">
              <BillableIcon />
            </IconButton>
            <Date>{formatDate(props.timeEntry.data)}</Date>
            <Duration>
              {formatDurationToInlineTime(props.timeEntry.data.duration)}
            </Duration>
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

      {expanded &&
        isParentTimeEntry(props.timeEntry) &&
        props.timeEntry.children.map(child => (
          <TimeEntryRow
            key={child.data.id}
            timeEntry={child}
            edit={props.edit}
            checked={false}
            onCheckedChange={() => {}}
          />
        ))}
    </>
  )
}
