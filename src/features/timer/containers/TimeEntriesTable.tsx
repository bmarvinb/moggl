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
import {
  SelectionChanges,
  useSelection,
} from 'features/timer/hooks/useSelection'
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
import { FC, useReducer } from 'react'

export type TimeEntriesTableProps = {
  activeTimeEntryDuration: O.Option<number>
  activeTimeEntry: O.Option<ActiveTimeEntry>
  data: TimeEntryViewModel[]
  date: Date
  reportedDuration: number
}

// TODO: compare task, clientName, tags, billable status
const EqTimeEntryViewModel: Eq<TimeEntryViewModel> = struct({
  description: S.Eq,
  billable: B.Eq,
  project: struct({
    name: S.Eq,
  }),
})

function getTimeEntryIds(timeEntries: TimeEntryViewModel[]): string[] {
  return timeEntries.map(({ id }) => id)
}

export const TimeEntriesTable: FC<TimeEntriesTableProps> = props => {
  const [bulkEditMode, toggleBulkEditMode] = useReducer(state => !state, false)
  const totalTime = pipe(
    props.activeTimeEntryDuration,
    O.map(duration => props.reportedDuration + duration),
    O.getOrElse(() => props.reportedDuration),
  )
  const [{ entries, selected }, dispatch] = useSelection(
    getTimeEntryIds(props.data),
  )

  const isTimeEntryRowChecked = (id: string) => selected.includes(id)

  const restTimeEntries = (timeEntry: TimeEntryViewModel) =>
    pipe(
      props.data,
      A.filter(({ id }) => id !== timeEntry.id),
    )

  const getParentChildren =
    (timeEntry: TimeEntryViewModel) =>
    (timeEntries: TimeEntryViewModel[]): TimeEntryViewModel[] =>
      pipe(
        timeEntries,
        A.filter(comparedTimeEntry =>
          EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
        ),
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

  const createParentChildren = (timeEntry: TimeEntryViewModel) => [
    createChild(timeEntry),
    ...pipe(
      timeEntry,
      restTimeEntries,
      getParentChildren(timeEntry),
      A.map(createChild),
    ),
  ]

  const calculateParentStartDate = (children: ChildTimeEntry[]): Date =>
    pipe(
      children,
      A.map(({ data }) => data.start),
      min,
    )

  const calculateParentEndDate = (children: ChildTimeEntry[]): Date =>
    pipe(
      children,
      A.map(({ data }) => data.end),
      max,
    )

  const calculateParentDuration = (children: ChildTimeEntry[]): number =>
    pipe(
      children,
      A.map(({ data }) => data.duration),
      M.concatAll(N.MonoidSum),
    )

  const createParentTimeEntry = (
    timeEntry: TimeEntryViewModel,
  ): ParentTimeEntry => {
    const children = createParentChildren(timeEntry)
    return {
      type: TimeEntryRowType.Parent,
      data: {
        ...timeEntry,
        start: calculateParentStartDate(children),
        end: calculateParentEndDate(children),
        duration: calculateParentDuration(children),
      },
      children,
    }
  }

  const isParent = (timeEntry: TimeEntryViewModel): boolean =>
    pipe(
      restTimeEntries(timeEntry),
      A.some(comparedTimeEntry =>
        EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
      ),
    )

  const isChild =
    (timeEntry: TimeEntryViewModel) =>
    (timeEntries: ParentTimeEntry[]): boolean =>
      pipe(
        timeEntries,
        A.some(({ children }) =>
          pipe(
            children,
            A.some(({ data }) => data.id === timeEntry.id),
          ),
        ),
      )

  const timeEntryRows = pipe(
    props.data,
    A.reduce([] as TimeEntryRowViewModel[], (acc, timeEntry) => {
      const isChildrenTimeEntry = pipe(
        acc,
        A.filter(isParentTimeEntry),
        isChild(timeEntry),
      )
      return isChildrenTimeEntry
        ? acc
        : [
            ...acc,
            isParent(timeEntry)
              ? createParentTimeEntry(timeEntry)
              : createRegularTimeEntry(timeEntry),
          ]
    }),
  )

  const onToggleClicked = () => {
    toggleBulkEditMode()
    dispatch({ type: 'RESET' })
  }

  const onBulkModeChanged = () => {
    dispatch({ type: 'ALL' })
  }

  const onParentSelectionChange = (changes: SelectionChanges) => {
    dispatch({ type: 'PARENT', payload: changes })
  }

  const onChildSelectionChange = (id: string) => {
    dispatch({ type: 'CHILD', payload: id })
  }

  const onPlayClicked = (timeEntry: TimeEntryRowViewModel) => {
    console.log('Play', timeEntry)
  }

  return (
    <TimeEntriesTableView
      bulkEditMode={bulkEditMode}
      allSelected={entries.length === selected.length}
      totalTime={totalTime}
      reportedTime={props.reportedDuration}
      date={props.date}
      onBulkModeChanged={onBulkModeChanged}
      onToggleClicked={onToggleClicked}
    >
      {timeEntryRows.map(timeEntry =>
        isParentTimeEntry(timeEntry) ? (
          <ParentTimeEntryRow
            key={timeEntry.data.id}
            timeEntry={timeEntry}
            edit={bulkEditMode}
            selectedIds={selected}
            onPlayClicked={onPlayClicked}
            onParentSelectionChange={onParentSelectionChange}
            onChildSelectionChange={onChildSelectionChange}
          />
        ) : (
          <TimeEntryViewRow
            key={timeEntry.data.id}
            timeEntry={timeEntry}
            edit={bulkEditMode}
            selected={isTimeEntryRowChecked(timeEntry.data.id)}
            onPlayClicked={onPlayClicked}
            onSelectionChange={onChildSelectionChange}
          />
        ),
      )}
    </TimeEntriesTableView>
  )
}
