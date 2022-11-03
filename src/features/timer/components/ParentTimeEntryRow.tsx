import {
  ParentTimeEntry,
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow';
import { SelectionChanges } from 'features/timer/hooks/selection';
import React from 'react';

export type ParentTimeEntryRowProps = {
  timeEntry: ParentTimeEntry;
  edit: boolean;
  selectedIds: string[];
  onPlayClicked: (timeEntry: TimeEntryRowViewModel) => void;
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
      <div data-testid={`${props.timeEntry.data.id}-parent`}>
        <TimeEntryViewRow
          timeEntry={props.timeEntry}
          edit={props.edit}
          selected={allChildrenChecked}
          onSelectionChange={onParentSelectionChange}
          onPlayClicked={props.onPlayClicked}
          onToggleChildrenVisibility={toggleExpanded}
        />
      </div>
      <div
        data-testid={`${props.timeEntry.data.id}-children`}
        hidden={!expanded}
      >
        {props.timeEntry.children.map(child => (
          <TimeEntryViewRow
            key={child.data.id}
            timeEntry={child}
            edit={props.edit}
            selected={isChildChecked(child.data.id)}
            onPlayClicked={props.onPlayClicked}
            onSelectionChange={props.onChildSelectionChange}
          />
        ))}
      </div>
    </>
  );
};
