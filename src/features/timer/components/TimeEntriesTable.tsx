import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow';
import { TimeEntryRowContainer } from 'features/timer/components/TimeEntryRowContainer';
import {
  TimeEntryRow,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import { ReportedDay } from 'features/timer/hooks/useReportedDays';
import {
  isParentTimeEntry,
  SelectionChanges,
  useSelection,
} from 'features/timer/hooks/useSelection';
import { TimerData } from 'features/timer/machines/TimerMachine';
import { TimerContext } from 'features/timer/machines/TimerMachineProvider';
import {
  formatDuration,
  getTimeEntryInfo,
} from 'features/timer/utils/time-entries-utils';
import React from 'react';

export type TimeEntriesTableProps = {
  day: ReportedDay;
};

function getTimerData(timeEntry: TimeEntryRow): TimerData {
  return {
    id: timeEntry.data.id,
    start: new Date(),
    timeEntry: {
      description: timeEntry.data.description,
      billable: timeEntry.data.billable,
      projectId: timeEntry.data.project?.id,
    },
  };
}

export const TimeEntriesTable = (props: TimeEntriesTableProps) => {
  const service = React.useContext(TimerContext);
  const [bulkEditMode, toggleBulkEditMode] = React.useReducer(
    state => !state,
    false,
  );
  const [{ entries, selected }, dispatch] = useSelection(
    props.day.data.map(item => item.data.id),
  );
  const isTimeEntryRowChecked = (id: string) => selected.includes(id);

  const onToggleClicked = () => {
    toggleBulkEditMode();
    dispatch({ type: 'RESET' });
  };

  const onBulkModeChanged = () => {
    dispatch({ type: 'ALL' });
  };

  const onParentSelectionChange = (changes: SelectionChanges) => {
    dispatch({ type: 'PARENT', changes: changes });
  };

  const onChildSelectionChange = (id: string) => {
    dispatch({ type: 'CHILD', id: id });
  };

  const onPlayClicked = (timeEntry: TimeEntryRow) => {
    service.send({
      type: 'RESUME',
      data: getTimerData(timeEntry),
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
      {props.day.data.map(timeEntry =>
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
