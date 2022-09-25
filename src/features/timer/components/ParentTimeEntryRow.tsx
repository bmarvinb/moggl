import {
  ParentTimeEntry,
  TimeEntryRowViewModel,
  TimeEntryViewRow,
} from 'features/timer/components/TimeEntryViewRow'
import { FC, useReducer } from 'react'

export type ParentTimeEntryRowProps = {
  timeEntry: ParentTimeEntry
  edit: boolean
  checkedIds: string[]
  onPlayClicked: (timeEntry: TimeEntryRowViewModel) => void
  onSelectionChange: (added: string[], removed: string[]) => void
}

export const ParentTimeEntryRow: FC<ParentTimeEntryRowProps> = props => {
  const [expanded, toggleExpanded] = useReducer(state => !state, false)

  const childrenIds = props.timeEntry.children.map(({ data }) => data.id)

  const allChildrenChecked = childrenIds.every(id =>
    props.checkedIds.includes(id),
  )

  const isChildChecked = (id: string) => props.checkedIds.includes(id)

  const onParentCheckedChange = () =>
    props.onSelectionChange(
      allChildrenChecked ? [] : childrenIds,
      allChildrenChecked ? childrenIds : [],
    )

  const onChildCheckedChange = (id: string) => {
    const removed = props.checkedIds.includes(id)
    props.onSelectionChange(removed ? [] : [id], removed ? [id] : [])
  }

  return (
    <>
      <div data-testid={`${props.timeEntry.data.id}-parent`}>
        <TimeEntryViewRow
          timeEntry={props.timeEntry}
          edit={props.edit}
          checked={allChildrenChecked}
          onSelectionChange={onParentCheckedChange}
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
            checked={isChildChecked(child.data.id)}
            onPlayClicked={props.onPlayClicked}
            onSelectionChange={onChildCheckedChange}
          />
        ))}
      </div>
    </>
  )
}
