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
  useSelection,
} from 'features/timer/hooks/selection';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';
import React from 'react';

export type TimeEntriesTableProps = {
  data: InactiveTimeEntry[];
  date: Date;
  reportedDuration: number;
};

function getTimeEntryIds(timeEntries: InactiveTimeEntry[]): string[] {
  return timeEntries.map(({ id }) => id);
}

export const TimeEntriesTable = (props: TimeEntriesTableProps) => {
  const service = useTimerMachine();
  const [timerState, timerSend] = useActor(service);
  const [bulkEditMode, toggleBulkEditMode] = React.useReducer(
    state => !state,
    false,
  );
  const [{ entries, selected }, send] = useSelection(
    getTimeEntryIds(props.data),
  );
  const isTimeEntryRowChecked = (id: string) => selected.includes(id);

  const restTimeEntries = (timeEntry: InactiveTimeEntry) =>
    props.data.filter(({ id }) => id !== timeEntry.id);

  const getParentChildren = (
    timeEntry: InactiveTimeEntry,
    timeEntries: InactiveTimeEntry[],
  ) =>
    timeEntries.filter(
      comparedTimeEntry =>
        timeEntry.description === comparedTimeEntry.description, // TODO: implement algorithm
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
    const data = restTimeEntries(timeEntry);
    const children = getParentChildren(timeEntry, data);
    const siblings = children.length;
    return [
      createChild(timeEntry, siblings),
      ...children.map(child => createChild(child, siblings)),
    ];
  };

  const calculateParentStartDate = (children: ChildTimeEntry[]): Date =>
    min(children.map(({ data }) => data.start));

  const calculateParentEndDate = (children: ChildTimeEntry[]): Date =>
    max(children.map(({ data }) => data.end));

  const calculateParentDuration = (children: ChildTimeEntry[]): number =>
    children
      .map(({ data }) => data.duration)
      .reduce((acc, val) => acc + val, 0);

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
    restTimeEntries(timeEntry).some(
      comparedTimeEntry =>
        timeEntry.description === comparedTimeEntry.description, // TODO: implement algorithm
    );

  const isChild = (
    timeEntry: InactiveTimeEntry,
    timeEntries: ParentTimeEntry[],
  ): boolean =>
    timeEntries.some(({ children }) =>
      children.some(({ data }) => data.id === timeEntry.id),
    );

  const timeEntryRows = props.data.reduce((acc, timeEntry) => {
    const data = acc.filter(isParentTimeEntry);
    const isChildrenTimeEntry = isChild(timeEntry, data);

    return isChildrenTimeEntry
      ? acc
      : [
          ...acc,
          isParent(timeEntry)
            ? createParentTimeEntry(timeEntry)
            : createRegularTimeEntry(timeEntry),
        ];
  }, [] as TimeEntryRowViewModel[]);

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
          projectId: timeEntry.data.project?.id,
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
