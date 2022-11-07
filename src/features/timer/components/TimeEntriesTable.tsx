import React from 'react';
import { ReportedDay } from '../hooks/useReportedDays';
import {
  isParentTimeEntry,
  SelectionChanges,
  useSelection,
} from '../hooks/useSelection';
import { TimerData } from '../machines/TimerMachine';
import { TimerContext } from '../providers/TimerMachineProvider';
import { formatTimeEntryDuration, getTimeEntryInfo } from '../utils';
import { ParentTimeEntryRow } from './ParentTimeEntryRow';
import { TimeEntryRowContainer } from './TimeEntryRowContainer';
import { TimeEntryRow, TimeEntryViewRow } from './TimeEntryViewRow';

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
            duration={formatTimeEntryDuration(timeEntry.data.duration)}
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
