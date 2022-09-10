import {
  TimeEntry,
  InactiveTimeEntry,
  ActiveTimeEntry,
} from 'features/timer/services/time-entries'

export function isInactiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is InactiveTimeEntry {
  return (
    typeof timeEntry.timeInterval.end === 'string' &&
    typeof timeEntry.projectId === 'string'
  )
}

export function isActiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is ActiveTimeEntry {
  return isInactiveTimeEntry(timeEntry)
}
