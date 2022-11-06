import React from 'react';
import { SelectionChanges } from '../hooks/useSelection';
import {
  formatTimeEntryDuration,
  getTimeEntryInfo,
} from '../utils/time-entries-utils';
import {
  ParentTimeEntry,
  TimeEntryRow,
  TimeEntryViewRow,
} from './TimeEntryViewRow';

export type ParentTimeEntryRowProps = {
  timeEntry: ParentTimeEntry;
  edit: boolean;
  selectedIds: string[];
  onPlayClicked: (timeEntry: TimeEntryRow) => void;
  onParentSelectionChange: (changes: SelectionChanges) => void;
  onChildSelectionChange: (id: string) => void;
};

export const ParentTimeEntryRow = (props: ParentTimeEntryRowProps) => {
  const [expanded, toggleExpanded] = React.useReducer(state => !state, false);

  const childrenIds = props.timeEntry.children.map(({ data }) => data.id);

  const allChildrenChecked = childrenIds.every(id =>
    props.selectedIds.includes(id),
  );

  const isChildChecked = (id: string) => props.selectedIds.includes(id);

  const onParentSelectionChange = () =>
    props.onParentSelectionChange({
      added: allChildrenChecked ? [] : childrenIds,
      removed: allChildrenChecked ? childrenIds : [],
    });

  return (
    <>
      <div>
        <TimeEntryViewRow
          timeEntry={props.timeEntry}
          edit={props.edit}
          selected={allChildrenChecked}
          onSelectionChange={onParentSelectionChange}
          onPlayClicked={() => props.onPlayClicked(props.timeEntry)}
          onToggleChildrenVisibility={toggleExpanded}
          duration={formatTimeEntryDuration(props.timeEntry.data.duration)}
          projectInfo={
            props.timeEntry.data.project
              ? getTimeEntryInfo(props.timeEntry.data)
              : undefined
          }
        />
      </div>
      <div hidden={!expanded}>
        {props.timeEntry.children.map(child => (
          <TimeEntryViewRow
            key={child.data.id}
            timeEntry={child}
            edit={props.edit}
            selected={isChildChecked(child.data.id)}
            onPlayClicked={() => props.onPlayClicked(child)}
            onSelectionChange={() =>
              props.onChildSelectionChange(child.data.id)
            }
            duration={formatTimeEntryDuration(child.data.duration)}
            projectInfo={
              child.data.project ? getTimeEntryInfo(child.data) : undefined
            }
          />
        ))}
      </div>
    </>
  );
};
