import { Checkbox, IconButton } from 'components'
import { isToday, isYesterday } from 'date-fns'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'
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
  activeTimeEntryDuration,
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
import { FC, useEffect, useReducer, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import styled from 'styled-components/macro'

export type TimeEntriesTableProps = {
  data: TimeEntryViewModel[]
  date: Date
  reportedTime: number
  activeTimeEntryStart: Date | undefined
}

// TODO: compare task, clientName, tags, billable status
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
  const [bulkEditMode, toggleBulkEditMode] = useReducer(state => !state, false)
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [totalTime, setTotalTime] = useState<number>(
    props.reportedTime + activeTimeEntryDuration(props.activeTimeEntryStart),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime(
        props.reportedTime +
          activeTimeEntryDuration(props.activeTimeEntryStart),
      )
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [props.activeTimeEntryStart, props.reportedTime])

  const allRowsChecked = checkedIds.length === props.data.length

  const onBulkModeChanged = () => {
    setCheckedIds(allRowsChecked ? [] : props.data.map(({ id }) => id))
  }

  const onToggleClicked = () => {
    toggleBulkEditMode()
    setCheckedIds([])
  }

  const isTimeEntryRowChecked = (id: string) => checkedIds.includes(id)

  const onParentTimeEntryCheckedChange = ([addedIds, removedIds]: [
    string[],
    string[],
  ]) => {
    pipe(
      checkedIds,
      A.filter(id => !removedIds.includes(id)),
      A.concat(addedIds),
      setCheckedIds,
    )
  }

  const onTimeEntryCheckedChange = (id: string) => {
    const ids = checkedIds.includes(id)
      ? checkedIds.filter(checkedId => checkedId !== id)
      : checkedIds.concat([id])
    setCheckedIds(ids)
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

  console.log('render table, date: ', props.date)

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
          {bulkEditMode && (
            <div
              css={`
                margin-right: 1rem;
              `}
            >
              <Checkbox onChange={onBulkModeChanged} checked={allRowsChecked} />
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
              {isToday(props.date)
                ? formatDurationToInlineTime(totalTime)
                : formatDurationToInlineTime(props.reportedTime)}
            </div>
          </Label>
        </div>
        <Label>
          <IconButton
            $active={bulkEditMode}
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
      {timeEntries.map(timeEntry => {
        return isParentTimeEntry(timeEntry) ? (
          <ParentTimeEntryRow
            key={timeEntry.data.id}
            data={timeEntry}
            edit={bulkEditMode}
            checkedIds={checkedIds}
            onParentCheckedChange={onParentTimeEntryCheckedChange}
          />
        ) : (
          <TimeEntryRow
            key={timeEntry.data.id}
            data={timeEntry}
            edit={bulkEditMode}
            checked={isTimeEntryRowChecked(timeEntry.data.id)}
            onCheckedChange={onTimeEntryCheckedChange}
          />
        )
      })}
    </TimeEntryTable>
  )
}
