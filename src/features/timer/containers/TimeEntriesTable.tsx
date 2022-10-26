import { useActor } from '@xstate/react';
import { max, min } from 'date-fns';
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow';
import { TimeEntriesTableView } from 'features/timer/components/TimeEntriesTableView';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import {
  isParentTimeEntry,
  SelectionChanges,
  TimeEntryRowType,
  useTimeEntrySelection,
} from 'features/timer/hooks/timeEntrySelection';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';
import * as B from 'fp-ts/boolean';
import { Eq, struct } from 'fp-ts/Eq';
import * as A from 'fp-ts/lib/Array';
import { constUndefined, pipe } from 'fp-ts/lib/function';
import * as M from 'fp-ts/lib/Monoid';
import * as N from 'fp-ts/lib/number';
import * as O from 'fp-ts/lib/Option';
import * as S from 'fp-ts/string';
import React from 'react';

export type TimeEntriesTableProps = {
  data: InactiveTimeEntry[];
  date: Date;
  reportedDuration: number;
};

// TODO: task, project, clientName, tags, billable status
const EqTimeEntryViewModel: Eq<InactiveTimeEntry> = struct({
  description: S.Eq,
  billable: B.Eq,
});

function getTimeEntryIds(timeEntries: InactiveTimeEntry[]): string[] {
  return timeEntries.map(({ id }) => id);
}

export const TimeEntriesTable: React.FC<TimeEntriesTableProps> = props => {
  const service = useTimerMachine();
  const [timerState, timerSend] = useActor(service);
  const [bulkEditMode, toggleBulkEditMode] = React.useReducer(
    state => !state,
    false,
  );
  const [{ entries, selected }, send] = useTimeEntrySelection(
    getTimeEntryIds(props.data),
  );
  const isTimeEntryRowChecked = (id: string) => selected.includes(id);

  const restTimeEntries = (timeEntry: InactiveTimeEntry) =>
    pipe(
      props.data,
      A.filter(({ id }) => id !== timeEntry.id),
    );

  const getParentChildren =
    (timeEntry: InactiveTimeEntry) =>
    (timeEntries: InactiveTimeEntry[]): InactiveTimeEntry[] =>
      pipe(
        timeEntries,
        A.filter(comparedTimeEntry =>
          EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
        ),
      );

  const createChild = (
    data: InactiveTimeEntry,
    siblings: number,
  ): ChildTimeEntry => ({
    type: TimeEntryRowType.Child,
    siblings,
    data,
  });

  const createRegularTimeEntry = (
    data: InactiveTimeEntry,
  ): RegularTimeEntry => ({
    type: TimeEntryRowType.Regular,
    data,
  });

  const createParentChildren = (timeEntry: InactiveTimeEntry) => {
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
    timeEntry: InactiveTimeEntry,
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

  const isParent = (timeEntry: InactiveTimeEntry): boolean =>
    pipe(
      restTimeEntries(timeEntry),
      A.some(comparedTimeEntry =>
        EqTimeEntryViewModel.equals(timeEntry, comparedTimeEntry),
      ),
    );

  const isChild =
    (timeEntry: InactiveTimeEntry) =>
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
    send({ type: 'RESET' });
  };

  const onBulkModeChanged = () => {
    send({ type: 'ALL' });
  };

  const onParentSelectionChange = (changes: SelectionChanges) => {
    send({ type: 'PARENT', changes: changes });
  };

  const onChildSelectionChange = (id: string) => {
    send({ type: 'CHILD', id: id });
  };

  const onPlayClicked = (timeEntry: TimeEntryRowViewModel) => {
    timerSend({
      type: 'RESUME',
      data: {
        id: timeEntry.data.id,
        start: new Date(),
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
