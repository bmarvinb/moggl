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

  const isChildChecked = (id: string) => props.checkedIds.includes(id)

  const onParentCheckedChange = () => {
    const childrenIds = props.timeEntry.children.map(({ data }) => data.id)
    props.onParentCheckedChange(
      allChildrenChecked ? [[], childrenIds] : [childrenIds, []],
    )
  }

  const onChildCheckedChange = (id: string) => {
    const wasRemoved = props.checkedIds.includes(id)
    props.onParentCheckedChange(wasRemoved ? [[], [id]] : [[id], []])
  }

  return (
    <>
      <div
        id={`${props.timeEntry.data.id}`}
        aria-expanded={expanded}
        aria-controls={`${props.timeEntry.data.id}-children`}
        data-testid={`${props.timeEntry.data.id}`}
      >
        <TimeEntryViewRow
          timeEntry={props.timeEntry}
          edit={props.edit}
          checked={allChildrenChecked}
          onCheckedChange={onParentCheckedChange}
          onPlayClicked={props.onPlayClicked}
          onToggleChildrenVisibility={toggleExpanded}
        />
      </div>
      <div
        id={`${props.timeEntry.data.id}-children`}
        data-testid={`${props.timeEntry.data.id}-children`}
        hidden={!expanded}
        role="region"
        aria-labelledby={`${props.timeEntry.data.id}`}
        aria-hidden={!expanded}
      >
        {props.timeEntry.children.map(child => (
          <TimeEntryViewRow
            key={child.data.id}
            timeEntry={child}
            edit={props.edit}
            checked={isChildChecked(child.data.id)}
            onPlayClicked={props.onPlayClicked}
            onCheckedChange={onChildCheckedChange}
          />
        ))}
      </div>
    </>
  )
}
