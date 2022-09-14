import { Checkbox } from 'components'
import { isToday, isYesterday } from 'date-fns'
import { TimeEntryRowData } from 'features/timer/components/ReportedDays'
import { TimeEntryRow } from 'features/timer/components/TimeEntryRow'
import { FC, useReducer, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableProps = {
  timeEntries: TimeEntryRowData[]
  date: Date
  totalTime: string
}

const List = styled.div`
  margin-bottom: 2rem;
  background: var(--neutral0);
  border-radius: var(--roundedMd);
  box-shadow: var(--shadowSm);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
`

const Label = styled.div`
  font-size: var(--fontLg);
  line-height: var(--lineHeightLg);
  display: flex;
  align-items: center;
  font-weight: 500;
`

const Time = styled.div`
  font-weight: 400;
  color: var(--neutral6);
`

const Toggle = styled(BiListUl)<{ $active: boolean }>`
  font-size: var(--fontLg);
  line-height: var(--lineHeightLg);
  color: ${props => (props.$active ? 'var(--primary4)' : 'var(--neutral9)')};

  &:hover {
    color: var(--primary3);
    cursor: pointer;
  }

  &:active {
    color: var(--primary5);
  }
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

export const TimeEntriesTable: FC<TimeEntriesTableProps> = props => {
  const [bulkEditEnabled, toggleBulkEditEnabled] = useReducer(
    state => !state,
    false,
  )
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allChecked = selectedIds.length === props.timeEntries.length

  const ids = props.timeEntries.map(({ id }) => id)

  const onBulkSelectionToggleChanged = () => {
    allChecked ? setSelectedIds([]) : setSelectedIds(ids)
  }

  const onToggleClicked = () => {
    toggleBulkEditEnabled()
    setSelectedIds([])
  }

  const isTimeEntryRowChecked = (id: string) => {
    return selectedIds.includes(id)
  }

  const onTimeEntryCheckedChange = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    setSelectedIds(updated)
  }

  return (
    <List>
      <Header>
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          {bulkEditEnabled && (
            <div
              css={`
                margin-right: 1rem;
              `}
            >
              <Checkbox
                onChange={onBulkSelectionToggleChanged}
                checked={allChecked}
              />
            </div>
          )}
          <Label>
            <div
              css={`
                margin-right: 0.5rem;
              `}
            >
              {formatDate(props.date)}
            </div>{' '}
            <Time>{props.totalTime}</Time>
          </Label>
        </div>
        <Label>
          <Toggle $active={bulkEditEnabled} onClick={onToggleClicked} />
        </Label>
      </Header>
      <div>
        {props.timeEntries.map(timeEntry => (
          <TimeEntryRow
            key={timeEntry.id}
            timeEntry={timeEntry}
            edit={bulkEditEnabled}
            checked={isTimeEntryRowChecked(timeEntry.id)}
            onCheckedChange={onTimeEntryCheckedChange}
          />
        ))}
      </div>
    </List>
  )
}
