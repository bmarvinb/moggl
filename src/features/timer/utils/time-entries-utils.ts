import { isDate } from 'date-fns'
import {
  TimeEntry,
  InactiveTimeEntry,
  ActiveTimeEntry,
} from 'features/timer/services/time-entries'

export function isInactiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is InactiveTimeEntry {
  return (
    typeof timeEntry.projectId === 'string' &&
    isDate(timeEntry.timeInterval.end)
  )
}

export function isActiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is ActiveTimeEntry {
  return isInactiveTimeEntry(timeEntry)
}
