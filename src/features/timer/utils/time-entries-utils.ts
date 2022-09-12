import { differenceInSeconds } from 'date-fns'
import {
  ActiveTimeEntry,
  InactiveTimeEntry,
  TimeEntry,
} from 'features/timer/services/time-entries'

export function isInactiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is InactiveTimeEntry {
  return Boolean(timeEntry.projectId) && Boolean(timeEntry.timeInterval.end)
}

export function isActiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is ActiveTimeEntry {
  return isInactiveTimeEntry(timeEntry)
}

export function timeEntryDuration({ timeInterval }: InactiveTimeEntry): number {
  return differenceInSeconds(
    new Date(timeInterval.end),
    new Date(timeInterval.start),
  )
}
