import { Button, Checkbox, IconButton } from 'components'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import {
  formatDurationToInlineTime,
  formatTimeEntryDate,
  formatTimEntryInfo,
  isChildTimeEntry,
  isParentTimeEntry,
} from 'features/timer/utils/time-entries-utils'
import { FC } from 'react'
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

export type TimeEntryViewRowProps = {
  data: TimeEntryRowViewModel
  edit: boolean
  checked: boolean
  onCheckedChange: (timeEntryId: string) => void
  onExpandedClicked?: () => void
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

const RoundedButton = styled(Button)`
  border-radius: 100%;
  background: transparent;
  color: var(--neutral8);
  padding: 0.25rem;
  min-width: 2rem;
  height: 2rem;
  border: 1px solid var(--neutral6);
  margin: auto;
  margin-right: 1rem;

  &:hover {
    background: transparent;
    border-color: var(--primary3);
    color: var(--primary4);
  }

  &:active {
    background: transparent;
    border-color: var(--primary4);
    color: var(--primary5);
  }
`

export const TimeEntryViewRow: FC<TimeEntryViewRowProps> = props => {
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
            <RoundedButton
              onClick={() =>
                props.onExpandedClicked && props.onExpandedClicked()
              }
              aria-label="Expand time entries"
            >
              {props.data.children.length}
            </RoundedButton>
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
              aria-label="Select tags"
              css={`
                font-size: var(--fontSizeLg);
              `}
            >
              <BiPurchaseTag title="Select tags" />
            </IconButton>
            <IconButton
              aria-label="Change billable status"
              css={`
                font-size: var(--fontSizeLg);
              `}
            >
              <BiDollar title="Change billable status" />
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
              aria-label="Start timer"
              css={`
                margin-right: 0.5rem;
                font-size: var(--fontSizeXl);
              `}
            >
              <BiPlay title="Play" />
            </IconButton>
            <IconButton
              aria-label="Open actions"
              css={`
                font-size: var(--fontSizeXl);
              `}
            >
              <BiDotsVerticalRounded title="Actions" />
            </IconButton>
          </div>
        </div>
      </TimeEntryItem>
    </>
  )
}
