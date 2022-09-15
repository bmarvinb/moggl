import { Checkbox, IconButton } from 'components'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import {
  formatTimEntryInfo,
  formatTimeEntryDate,
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
  data: TimeEntryViewModel
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

export type TimeEntryRowViewModel =
  | RegularTimeEntry
  | ParentTimeEntry
  | ChildTimeEntry

export type TimeEntryRowProps = {
  data: TimeEntryRowViewModel
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

export const TimeEntryRow: FC<TimeEntryRowProps> = props => {
  const [expanded, toggleExpanded] = useReducer(state => !state, false)

  return (
    <>
      <TimeEntryItem key={props.data.data.id}>
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
                onChange={() => props.onCheckedChange(props.data.data.id)}
              />
            </div>
          )}
          {isParentTimeEntry(props.data) && (
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
                min-width: 2rem;
                min-height: 2rem;
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
              {props.data.children.length}
            </div>
          )}
          <div
            css={`
              display: flex;
              flex-direction: column;
              padding-left: ${isChildTimeEntry(props.data) ? '3rem' : '0'};
            `}
          >
            <Description $empty={props.data.data.description.length === 0}>
              {props.data.data.description || 'Add description'}
            </Description>
            <AdditionalInfo $color={props.data.data.project.color}>
              {formatTimEntryInfo(props.data.data)}
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
            <IconButton
              aria-label="tags"
              css={`
                font-size: var(--fontSizeLg);
              `}
            >
              <BiPurchaseTag title="Tags" />
            </IconButton>
            <IconButton
              aria-label="billable"
              css={`
                font-size: var(--fontSizeLg);
              `}
            >
              <BiDollar title="Billable" />
            </IconButton>
            <div
              css={`
                display: none;
              `}
            >
              {formatTimeEntryDate(props.data.data)}
            </div>
            <div
              css={`
                font-weight: 500;
                line-height: var(--lineHeightLg);
              `}
            >
              {formatDurationToInlineTime(props.data.data.duration)}
            </div>
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
                font-size: var(--fontSizeXl);
              `}
            >
              <BiPlay title="Play" />
            </IconButton>
            <IconButton
              aria-label="actions"
              css={`
                font-size: var(--fontSizeXl);
              `}
            >
              <BiDotsVerticalRounded title="Actions" />
            </IconButton>
          </div>
        </div>
      </TimeEntryItem>

      {expanded &&
        isParentTimeEntry(props.data) &&
        props.data.children.map(child => (
          <TimeEntryRow
            key={child.data.id}
            data={child}
            edit={props.edit}
            checked={false}
            onCheckedChange={() => {}}
          />
        ))}
    </>
  )
}
