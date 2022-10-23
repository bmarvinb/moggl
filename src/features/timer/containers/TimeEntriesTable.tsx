import { useActor } from '@xstate/react';
import { max, min } from 'date-fns';
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow';
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays';
import { TimeEntriesTableView } from 'features/timer/components/TimeEntriesTableView';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRowType,
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import {
  SelectionChanges,
  useSelection,
} from 'features/timer/hooks/useSelection';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { ActiveTimeEntryModel } from 'features/timer/models/time-entries';
import { isParentTimeEntry } from 'features/timer/utils/time-entries-utils';
import * as B from 'fp-ts/boolean';
import { Eq, struct } from 'fp-ts/Eq';
import * as A from 'fp-ts/lib/Array';
import { constNull, constUndefined, pipe } from 'fp-ts/lib/function';
import * as M from 'fp-ts/lib/Monoid';
import * as N from 'fp-ts/lib/number';
import * as O from 'fp-ts/lib/Option';
import * as S from 'fp-ts/string';
import { FC, useReducer } from 'react';

export type TimeEntriesTableProps = {
  activeTimeEntry: O.Option<ActiveTimeEntryModel>;
  data: TimeEntryViewModel[];
  date: Date;
  reportedDuration: number;
};

// TODO: task, project, clientName, tags, billable status
const EqTimeEntryViewModel: Eq<TimeEntryViewModel> = struct({
  description: S.Eq,
  billable: B.Eq,
});

function getTimeEntryIds(timeEntries: TimeEntryViewModel[]): string[] {
  return timeEntries.map(({ id }) => id);
}

export const TimeEntriesTable: FC<TimeEntriesTableProps> = props => {
  const service = useTimerMachine();
  const [timerState, timerSend] = useActor(service);
  const [bulkEditMode, toggleBulkEditMode] = useReducer(state => !state, false);
  const [{ entries, selected }, dispatch] = useSelection(
    getTimeEntryIds(props.data),
  );
  const isTimeEntryRowChecked = (id: string) => selected.includes(id);

  const restTimeEntries = (timeEntry: TimeEntryViewModel) =>
    pipe(
      props.data,
      A.filter(({ id }) => id !== timeEntry.id),
    );

  const getParentChildren =
    (timeEntry: TimeEntryViewModel) =>
    (timeEntries: TimeEntryViewModel[]): TimeEntryViewModel[] =>
      pipe(
        timeEntries,
        A.filter(comparedTimeEntry =>
          EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
        ),
      );

  const createChild = (
    data: TimeEntryViewModel,
    siblings: number,
  ): ChildTimeEntry => ({
    type: TimeEntryRowType.Child,
    siblings,
    data,
  });

  const createRegularTimeEntry = (
    data: TimeEntryViewModel,
  ): RegularTimeEntry => ({
    type: TimeEntryRowType.Regular,
    data,
  });

  const createParentChildren = (timeEntry: TimeEntryViewModel) => {
    const children = pipe(
      timeEntry,
      restTimeEntries,
      getParentChildren(timeEntry),
    );
    const siblings = children.length;
    return [
      createChild(timeEntry, siblings),
      ...pipe(
        children,
        A.map(child => createChild(child, siblings)),
      ),
    ];
  };

  const calculateParentStartDate = (children: ChildTimeEntry[]): Date =>
    pipe(
      children,
      A.map(({ data }) => data.start),
      min,
    );

  const calculateParentEndDate = (children: ChildTimeEntry[]): Date =>
    pipe(
      children,
      A.map(({ data }) => data.end),
      max,
    );

  const calculateParentDuration = (children: ChildTimeEntry[]): number =>
    pipe(
      children,
      A.map(({ data }) => data.duration),
      M.concatAll(N.MonoidSum),
    );

  const createParentTimeEntry = (
    timeEntry: TimeEntryViewModel,
  ): ParentTimeEntry => {
    const children = createParentChildren(timeEntry);
    return {
      type: TimeEntryRowType.Parent,
      data: {
        ...timeEntry,
        start: calculateParentStartDate(children),
        end: calculateParentEndDate(children),
        duration: calculateParentDuration(children),
      },
      children,
    };
  };

  const isParent = (timeEntry: TimeEntryViewModel): boolean =>
    pipe(
      restTimeEntries(timeEntry),
      A.some(comparedTimeEntry =>
        EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
      ),
    );

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
      );

  const timeEntryRows = pipe(
    props.data,
    A.reduce([] as TimeEntryRowViewModel[], (acc, timeEntry) => {
      const isChildrenTimeEntry = pipe(
        acc,
        A.filter(isParentTimeEntry),
        isChild(timeEntry),
      );
      return isChildrenTimeEntry
        ? acc
        : [
            ...acc,
            isParent(timeEntry)
              ? createParentTimeEntry(timeEntry)
              : createRegularTimeEntry(timeEntry),
          ];
    }),
  );

  const onToggleClicked = () => {
    toggleBulkEditMode();
    dispatch({ type: 'RESET' });
  };

  const onBulkModeChanged = () => {
    dispatch({ type: 'ALL' });
  };

  const onParentSelectionChange = (changes: SelectionChanges) => {
    dispatch({ type: 'PARENT', payload: changes });
  };

  const onChildSelectionChange = (id: string) => {
    dispatch({ type: 'CHILD', payload: id });
  };

  const onPlayClicked = (timeEntry: TimeEntryRowViewModel) => {
    timerSend({
      type: 'RESUME',
      data: {
        id: timeEntry.data.id,
        start: new Date().toISOString(),
        timeEntry: {
          description: timeEntry.data.description,
          billable: timeEntry.data.billable,
          projectId: pipe(
            timeEntry.data.project,
            O.map(project => project.id),
            O.getOrElseW(constUndefined),
          ),
        },
      },
    });
  };

  return (
    <TimeEntriesTableView
      bulkEditMode={bulkEditMode}
      allSelected={entries.length === selected.length}
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
  );
};
