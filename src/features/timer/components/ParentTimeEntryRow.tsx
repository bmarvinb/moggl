import {
  ParentTimeEntry,
  TimeEntryRow,
} from 'features/timer/components/TimeEntryRow'
import { FC, useReducer } from 'react'

export type ParentTimeEntryRowProps = {
  data: ParentTimeEntry
  edit: boolean
  checkedIds: string[]
  onParentCheckedChange: (ids: [string[], string[]]) => void
}

export const ParentTimeEntryRow: FC<ParentTimeEntryRowProps> = props => {
  const [expanded, toggleExpanded] = useReducer(state => !state, false)

  const allChildrenChecked = props.data.children.every(child =>
    props.checkedIds.includes(child.data.id),
  )

  const onParentCheckedChange = () => {
    const childrenIds = props.data.children.map(({ data }) => data.id)
    props.onParentCheckedChange(
      allChildrenChecked ? [[], childrenIds] : [childrenIds, []],
    )
  }

  const isChildChecked = (id: string) => {
    return props.checkedIds.includes(id)
  }

  const onChildCheckedChange = (id: string) => {
    const wasRemoved = props.checkedIds.includes(id)
    props.onParentCheckedChange(wasRemoved ? [[], [id]] : [[id], []])
  }

  return (
    <>
      <TimeEntryRow
        data={props.data}
        edit={props.edit}
        checked={allChildrenChecked}
        onCheckedChange={onParentCheckedChange}
        onExpandedClicked={toggleExpanded}
      />
      {expanded &&
        props.data.children.map(child => (
          <TimeEntryRow
            key={child.data.id}
            data={child}
            edit={props.edit}
            checked={isChildChecked(child.data.id)}
            onCheckedChange={onChildCheckedChange}
          />
        ))}
    </>
  )
}