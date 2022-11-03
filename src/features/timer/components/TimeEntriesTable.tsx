import { useActor } from '@xstate/react';
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow';
import { TimeEntryRowContainer } from 'features/timer/components/TimeEntryRowContainer';
import {
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import {
  isParentTimeEntry,
  SelectionChanges,
  useSelection,
} from 'features/timer/hooks/selection';
import { useTimeEntryRows } from 'features/timer/hooks/timeEntryRows';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import React from 'react';

export type TimeEntriesTableProps = {
  data: CompletedTimeEntry[];
  date: Date;
  reportedDuration: number;
};

function getTimeEntryIds(timeEntries: CompletedTimeEntry[]): string[] {
  return timeEntries.map(({ id }) => id);
}

export const TimeEntriesTable = (props: TimeEntriesTableProps) => {
  const service = useTimerMachine();
  const [, timerSend] = useActor(service);
  const timeEntryRows = useTimeEntryRows(props.data);
  const [bulkEditMode, toggleBulkEditMode] = React.useReducer(
    state => !state,
    false,
  );
  const [{ entries, selected }, send] = useSelection(
    getTimeEntryIds(props.data),
  );
  const isTimeEntryRowChecked = (id: string) => selected.includes(id);

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
    <TimeEntryRowContainer
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
    </TimeEntryRowContainer>
  );
};
