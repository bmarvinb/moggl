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
  onParentCheckedChange: (ids: [string[], string[]]) => void
}

export const ParentTimeEntryRow: FC<ParentTimeEntryRowProps> = props => {
  const [expanded, toggleExpanded] = useReducer(state => !state, false)

  const allChildrenChecked = props.timeEntry.children.every(child =>
    props.checkedIds.includes(child.data.id),
  )

  const onParentCheckedChange = () => {
    const childrenIds = props.timeEntry.children.map(({ data }) => data.id)
    props.onParentCheckedChange(
      allChildrenChecked ? [[], childrenIds] : [childrenIds, []],
    )
  }

  const isChildChecked = (id: string) => props.checkedIds.includes(id)

  const onChildCheckedChange = (id: string) => {
    const wasRemoved = props.checkedIds.includes(id)
    props.onParentCheckedChange(wasRemoved ? [[], [id]] : [[id], []])
  }

  return (
    <>
      <TimeEntryViewRow
        timeEntry={props.timeEntry}
        edit={props.edit}
        checked={allChildrenChecked}
        onCheckedChange={onParentCheckedChange}
        onPlayClicked={props.onPlayClicked}
        onToggleChildrenVisibility={toggleExpanded}
        data-testid="PARENT_TIME_ENTRY"
      />
      {expanded &&
        props.timeEntry.children.map(child => (
          <TimeEntryViewRow
            key={child.data.id}
            timeEntry={child}
            edit={props.edit}
            checked={isChildChecked(child.data.id)}
            onPlayClicked={props.onPlayClicked}
            onCheckedChange={onChildCheckedChange}
            data-testid="PARENT_CHILD_TIME_ENTRY"
          />
        ))}
    </>
  )
}
