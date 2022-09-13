import { Checkbox } from 'components/Checkbox'
import { isToday, isYesterday } from 'date-fns'
import { ViewTimeEntry } from 'features/timer/components/GroupedTimeEntries'
import { TimeEntryRow } from 'features/timer/components/TimeEntryRow'
import { FC, useReducer, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableProps = {
  timeEntries: ViewTimeEntry[]
  date: Date
  totalTime: string
}

const List = styled.div`
  margin-bottom: 2rem;
  background: ${props => `#fff`};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.shadowSm};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 1.25rem;
`

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
  font-weight: 500;
`

const TotalTime = styled.div``

const Toggle = styled(BiListUl)<{ $active: boolean }>`
  margin-right: 0.5rem;
  font-size: ${props => props.theme.fonts.lg.fontSize};
  line-height: ${props => props.theme.fonts.lg.lineHeight};
  color: ${props =>
    props.$active ? props.theme.colors.blue4 : props.theme.colors.blueGrey9};
  &:hover {
    color: ${props => props.theme.colors.blue3};
    cursor: pointer;
  }
  &:active {
    color: ${props => props.theme.colors.blue5};
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
          `}
        >
          {bulkEditEnabled && (
            <div>
              <Checkbox
                onChange={onBulkSelectionToggleChanged}
                checked={allChecked}
              />
            </div>
          )}
          <Label>{formatDate(props.date)}</Label>
        </div>
        <Label>
          <Toggle $active={bulkEditEnabled} onClick={onToggleClicked} />
          <TotalTime>{props.totalTime}</TotalTime>
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
