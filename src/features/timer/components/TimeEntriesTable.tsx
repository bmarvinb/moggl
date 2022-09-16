import { Checkbox, IconButton } from 'components'
import { isToday, isYesterday } from 'date-fns'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRow,
  TimeEntryRowType,
  TimeEntryRowViewModel,
} from 'features/timer/components/TimeEntryRow'
import {
  formatDurationToInlineTime,
  isParentTimeEntry,
} from 'features/timer/utils/time-entries-utils'
import * as B from 'fp-ts/boolean'
import { Eq, struct } from 'fp-ts/Eq'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as M from 'fp-ts/lib/Monoid'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/string'
import { FC, useReducer, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableProps = {
  data: TimeEntryViewModel[]
  date: Date
  totalTime: number
}

// TODO: compare optionals task, clientName
const EqTimeEntryViewModel: Eq<TimeEntryViewModel> = struct({
  description: S.Eq,
  billable: B.Eq,
  project: struct({
    name: S.Eq,
  }),
})

const TimeEntryTable = styled.div`
  margin-bottom: 2rem;
  background: var(--neutral0);
  border-radius: var(--roundedMd);
  box-shadow: var(--shadowSm);
`

const Label = styled.div`
  font-size: var(--fontLg);
  line-height: var(--lineHeightLg);
  display: flex;
  align-items: center;
  font-weight: 500;
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

  const allChecked = selectedIds.length === props.data.length

  const ids = props.data.map(({ id }) => id)

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

  const restTimeEntries = (x: TimeEntryViewModel) =>
    pipe(
      props.data,
      A.filter(y => y.id !== x.id),
    )

  const getParentChildren =
    (x: TimeEntryViewModel) =>
    (xs: TimeEntryViewModel[]): TimeEntryViewModel[] =>
      pipe(
        xs,
        A.filter(y => EqTimeEntryViewModel.equals(x, y)),
      )

  const createChild = (data: TimeEntryViewModel): ChildTimeEntry => ({
    type: TimeEntryRowType.Child,
    data,
  })

  const createRegularTimeEntry = (
    data: TimeEntryViewModel,
  ): RegularTimeEntry => ({
    type: TimeEntryRowType.Regular,
    data,
  })

  const createParentTimeEntry = (x: TimeEntryViewModel): ParentTimeEntry => {
    const children = [
      createChild(x),
      ...pipe(x, restTimeEntries, getParentChildren(x), A.map(createChild)),
    ]
    return {
      type: TimeEntryRowType.Parent,
      data: {
        ...x,
        duration: pipe(
          children,
          A.map(({ data }) => data.duration),
          M.concatAll(N.MonoidSum),
        ),
      },
      children,
    }
  }

  const isParent = (x: TimeEntryViewModel): boolean =>
    pipe(
      restTimeEntries(x),
      A.some(y => EqTimeEntryViewModel.equals(x, y)),
    )

  const isChild =
    (x: TimeEntryViewModel) =>
    (xs: ParentTimeEntry[]): boolean =>
      pipe(
        xs,
        A.some(({ children }) =>
          pipe(
            children,
            A.some(({ data }) => data.id === x.id),
          ),
        ),
      )

  const timeEntries = pipe(
    props.data,
    A.reduce([] as TimeEntryRowViewModel[], (xs, x) => {
      if (pipe(xs, A.filter(isParentTimeEntry), isChild(x))) {
        return xs
      }
      return [
        ...xs,
        isParent(x) ? createParentTimeEntry(x) : createRegularTimeEntry(x),
      ]
    }),
  )

  return (
    <TimeEntryTable>
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
                margin-right: 0.25rem;
              `}
            >
              {formatDate(props.date)}
            </div>
            <div
              css={`
                font-weight: 400;
                color: var(--neutral7);
              `}
            >
              {formatDurationToInlineTime(props.totalTime)}
            </div>
          </Label>
        </div>
        <Label>
          <IconButton
            $active={bulkEditEnabled}
            aria-label="toggle"
            onClick={onToggleClicked}
            css={`
              font-size: var(--fontSizeLg);
            `}
          >
            <BiListUl title="Toggle" />
          </IconButton>
        </Label>
      </div>
      {timeEntries.map(timeEntry => (
        <TimeEntryRow
          key={timeEntry.data.id}
          data={timeEntry}
          edit={bulkEditEnabled}
          checked={isTimeEntryRowChecked(timeEntry.data.id)}
          onCheckedChange={onTimeEntryCheckedChange}
        />
      ))}
    </TimeEntryTable>
  )
}
