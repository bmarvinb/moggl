import { differenceInSeconds } from 'date-fns'
import {
  ParentTimeEntry,
  TimeEntryRowType,
  TimeEntryViewRow,
  RegularTimeEntry,
} from 'features/timer/components/TimeEntryRow'
import {
  ActiveTimeEntry,
  InactiveTimeEntry,
  TimeEntry,
} from 'features/timer/services/time-entries'

export function isInactiveTimeEntry(x: TimeEntry): x is InactiveTimeEntry {
  return Boolean(x.projectId) && Boolean(x.timeInterval.end)
}

export function isActiveTimeEntry(x: TimeEntry): x is ActiveTimeEntry {
  return isInactiveTimeEntry(x)
}

export function isRegularTimeEntry(x: TimeEntryViewRow): x is RegularTimeEntry {
  return x.type === TimeEntryRowType.Regular
}

export function isParentTimeEntry(x: TimeEntryViewRow): x is ParentTimeEntry {
  return x.type === TimeEntryRowType.Parent
}

export function timeEntryDuration({ timeInterval }: InactiveTimeEntry): number {
  return differenceInSeconds(
    new Date(timeInterval.end),
    new Date(timeInterval.start),
  )
}
