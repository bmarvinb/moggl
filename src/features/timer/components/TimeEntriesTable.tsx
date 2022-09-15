import { Checkbox, IconButton } from 'components'
import { isToday, isYesterday } from 'date-fns'
import { TimeEntryRowData } from 'features/timer/components/ReportedDays'
import {
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryViewRow,
  TimeEntryRow,
  TimeEntryRowType,
} from 'features/timer/components/TimeEntryRow'
import { isParentTimeEntry } from 'features/timer/utils/time-entries-utils'
import { Eq, struct } from 'fp-ts/Eq'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as S from 'fp-ts/string'
import * as B from 'fp-ts/boolean'
import { FC, useReducer, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableProps = {
  timeEntries: TimeEntryRowData[]
  date: Date
  totalTime: string
}

// TODO: compare optionals task, clientName
const EqTimeEntryRowData: Eq<TimeEntryRowData> = struct({
  description: S.Eq,
  billable: B.Eq,
  project: struct({
    name: S.Eq,
  }),
})

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

const TotalTime = styled.div`
  font-weight: 400;
  color: var(--neutral7);
`

const ListIcon = styled(BiListUl)<{ $active: boolean }>`
  font-size: var(--fontSizeLg);
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

  const isTimeEntryRowChecked = (id: string) => selectedIds.includes(id)

  const onTimeEntryCheckedChange = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    setSelectedIds(updated)
  }

  const restTimeEntries = (x: TimeEntryRowData) =>
    pipe(
      props.timeEntries,
      A.filter(y => y.id !== x.id),
    )

  const getParentChildren =
    (x: TimeEntryRowData) =>
    (xs: TimeEntryRowData[]): TimeEntryRowData[] =>
      pipe(
        xs,
        A.filter(y => EqTimeEntryRowData.equals(x, y)),
      )

  // TODO: calculate total duration
  const createParentTimeEntry = (data: TimeEntryRowData): ParentTimeEntry => ({
    type: TimeEntryRowType.Parent,
    data,
    children: pipe(data, restTimeEntries, getParentChildren(data)),
  })

  const createRegularTimeEntry = (
    data: TimeEntryRowData,
  ): RegularTimeEntry => ({
    type: TimeEntryRowType.Regular,
    data,
  })

  const isParent = (x: TimeEntryRowData): boolean =>
    pipe(
      restTimeEntries(x),
      A.some(y => EqTimeEntryRowData.equals(x, y)),
    )

  const isChild = (xs: ParentTimeEntry[], x: TimeEntryRowData): boolean =>
    pipe(
      xs,
      A.some(y => y.children.some(child => child.id === x.id)),
    )

  const timeEntries = pipe(
    props.timeEntries,
    A.reduce([] as TimeEntryViewRow[], (xs, x) => {
      const parents = pipe(xs, A.filter(isParentTimeEntry))
      if (isChild(parents, x)) {
        return xs
      }
      return [
        ...xs,
        isParent(x) ? createParentTimeEntry(x) : createRegularTimeEntry(x),
      ]
    }),
  )

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
            </div>
            <TotalTime>{props.totalTime}</TotalTime>
          </Label>
        </div>
        <Label>
          <IconButton aria-label="toggle bulk edit" onClick={onToggleClicked}>
            <ListIcon $active={bulkEditEnabled} />
          </IconButton>
        </Label>
      </Header>
      {timeEntries.map(timeEntry => (
        <TimeEntryRow
          key={timeEntry.data.id}
          timeEntry={timeEntry}
          edit={bulkEditEnabled}
          checked={isTimeEntryRowChecked(timeEntry.data.id)}
          onCheckedChange={onTimeEntryCheckedChange}
        />
      ))}
    </List>
  )
}
