import { nanoid } from 'nanoid'
import { FC } from 'react'
import { TimeEntry } from 'features/timer/services/time-entries'

export type GroupedTimeEntries = {
  date: Date
  timeEntries: TimeEntry[]
}

export type TimeEntriesListProps = {
  timeEntries: GroupedTimeEntries[]
}

export const TimeEntriesList: FC<TimeEntriesListProps> = props => {
  return (
    <div>
      {props.timeEntries.map(entry => (
        <div key={nanoid()}>
          <div>{entry.date.toDateString()}</div>
          <div>
            {entry.timeEntries.map(entry => (
              <div key={entry.id}>{entry.description}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
