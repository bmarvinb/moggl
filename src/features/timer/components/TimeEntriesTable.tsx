import { useActor } from '@xstate/react';
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow';
import { TimeEntryRowContainer } from 'features/timer/components/TimeEntryRowContainer';
import {
  TimeEntryRow,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import { ReportedDay } from 'features/timer/hooks/reportedDays';
import {
  isParentTimeEntry,
  SelectionChanges,
  useSelection,
} from 'features/timer/hooks/selection';
import { useTimeEntryRows } from 'features/timer/hooks/timeEntryRows';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import {
  formatDuration,
  getTimeEntryInfo,
} from 'features/timer/utils/time-entries-utils';
import React from 'react';

export type TimeEntriesTableProps = {
  day: ReportedDay;
};

export const TimeEntriesTable = (props: TimeEntriesTableProps) => {
  const service = useTimerMachine();
  const [, timerSend] = useActor(service);
  const timeEntryRows = useTimeEntryRows(props.day.data);
  const [bulkEditMode, toggleBulkEditMode] = React.useReducer(
    state => !state,
    false,
  );
  const [{ entries, selected }, send] = useSelection(
    props.day.data.map(({ id }) => id),
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

  const onPlayClicked = (timeEntry: TimeEntryRow) => {
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
      reportedTime={props.day.reportedDuration}
      date={props.day.date}
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
            onPlayClicked={() => onPlayClicked(timeEntry)}
            onSelectionChange={() => onChildSelectionChange(timeEntry.data.id)}
            duration={formatDuration(timeEntry.data.duration)}
            projectInfo={
              timeEntry.data.project
                ? getTimeEntryInfo(timeEntry.data)
                : undefined
            }
          />
        ),
      )}
    </TimeEntryRowContainer>
  );
};
