import { max, min } from 'date-fns'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import { TimeEntriesTableView } from 'features/timer/components/TimeEntriesTableView'
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRowType,
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { isParentTimeEntry } from 'features/timer/utils/time-entries-utils'
import * as B from 'fp-ts/boolean'
import { Eq, struct } from 'fp-ts/Eq'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as M from 'fp-ts/lib/Monoid'
import * as N from 'fp-ts/lib/number'
import * as O from 'fp-ts/lib/Option'
import * as S from 'fp-ts/string'
import { FC, useReducer, useState } from 'react'

export type TimeEntriesTableProps = {
  data: TimeEntryViewModel[]
  date: Date
  activeTimeEntryDuration: O.Option<number>
  reportedDuration: number
  activeTimeEntry: O.Option<ActiveTimeEntry>
}

// TODO: compare task, clientName, tags, billable status
const EqTimeEntryViewModel: Eq<TimeEntryViewModel> = struct({
  description: S.Eq,
  billable: B.Eq,
  project: struct({
    name: S.Eq,
  }),
})

export const TimeEntriesTable: FC<TimeEntriesTableProps> = props => {
  const [bulkEditMode, toggleBulkEditMode] = useReducer(state => !state, false)
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const totalTime = pipe(
    props.activeTimeEntryDuration,
    O.map(duration => props.reportedDuration + duration),
    O.getOrElse(() => props.reportedDuration),
  )

  const allRowsChecked = checkedIds.length === props.data.length

  const isTimeEntryRowChecked = (id: string) => checkedIds.includes(id)

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
        start: pipe(
          children,
          A.map(({ data }) => data.start),
          min,
        ),
        end: pipe(
          children,
          A.map(({ data }) => data.end),
          max,
        ),
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

  const onBulkModeChanged = () => {
    setCheckedIds(allRowsChecked ? [] : props.data.map(({ id }) => id))
  }

  const onToggleClicked = () => {
    toggleBulkEditMode()
    setCheckedIds([])
  }

  const onParentSelectionChange = (
    added: string[] = [],
    removed: string[] = [],
  ) => {
    pipe(
      checkedIds,
      A.filter(id => !removed.includes(id)),
      A.concat(added),
      setCheckedIds,
    )
  }

  const onChildSelectionChange = (id: string) => {
    const ids = checkedIds.includes(id)
      ? checkedIds.filter(checkedId => checkedId !== id)
      : checkedIds.concat([id])
    setCheckedIds(ids)
  }

  const onPlayClicked = (timeEntry: TimeEntryRowViewModel) => {
    console.log('Play', timeEntry)
  }

  return (
    <TimeEntriesTableView
      bulkEditMode={bulkEditMode}
      allRowsChecked={allRowsChecked}
      totalTime={totalTime}
      reportedTime={props.reportedDuration}
      date={props.date}
      onBulkModeChanged={onBulkModeChanged}
      onToggleClicked={onToggleClicked}
    >
      {timeEntries.map(timeEntry =>
        isParentTimeEntry(timeEntry) ? (
          <ParentTimeEntryRow
            key={timeEntry.data.id}
            timeEntry={timeEntry}
            edit={bulkEditMode}
            checkedIds={checkedIds}
            onPlayClicked={onPlayClicked}
            onSelectionChange={onParentSelectionChange}
          />
        ) : (
          <TimeEntryViewRow
            key={timeEntry.data.id}
            timeEntry={timeEntry}
            edit={bulkEditMode}
            checked={isTimeEntryRowChecked(timeEntry.data.id)}
            onPlayClicked={onPlayClicked}
            onSelectionChange={onChildSelectionChange}
          />
        ),
      )}
    </TimeEntriesTableView>
  )
}
