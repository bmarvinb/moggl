import { Checkbox, IconButton } from 'components'
import { isToday } from 'date-fns'
import {
  formatDate,
  formatDurationToInlineTime,
} from 'features/timer/utils/time-entries-utils'
import { FC, ReactNode } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableViewProps = {
  children: ReactNode
  bulkEditMode: boolean
  allRowsChecked: boolean
  totalTime: number
  reportedTime: number
  date: Date

  onBulkModeChanged: () => void
  onToggleClicked: () => void
}

const TimeEntriesTable = styled.div`
  margin-bottom: 1rem;
  background: var(--neutral0);
  border-radius: var(--roundedMd);
  box-shadow: var(--shadowSm);

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.div`
  font-size: var(--fontLg);
  line-height: var(--lineHeightLg);
  display: flex;
  align-items: center;
  font-weight: 500;
`

export const TimeEntriesTableView: FC<TimeEntriesTableViewProps> = props => {
  return (
    <TimeEntriesTable>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1rem;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          {props.bulkEditMode && (
            <div
              css={`
                margin-right: 1rem;
              `}
            >
              <Checkbox
                onChange={props.onBulkModeChanged}
                checked={props.allRowsChecked}
              />
            </div>
          )}
          <Label>
            <div
              css={`
                margin-right: 0.25rem;
              `}
            >
              {formatDate(props.date)}
            </div>
            <div
              css={`
                font-weight: 400;
                color: var(--neutral8);
                min-width: 4rem;
              `}
            >
              {isToday(props.date)
                ? formatDurationToInlineTime(props.totalTime)
                : formatDurationToInlineTime(props.reportedTime)}
            </div>
          </Label>
        </div>
        <Label>
          <IconButton
            $active={props.bulkEditMode}
            aria-label="Toggle edit mode"
            onClick={props.onToggleClicked}
            css={`
              font-size: var(--fontSizeLg);
              position: relative;
              right: -0.4rem;
            `}
          >
            <BiListUl title="Toggle" />
          </IconButton>
        </Label>
      </div>
      {props.children}
    </TimeEntriesTable>
  )
}
