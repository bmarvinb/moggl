import {
  differenceInSeconds,
  hoursToSeconds,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
  format,
  isToday,
  isYesterday,
} from 'date-fns'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import {
  ParentTimeEntry,
  TimeEntryRowType,
  TimeEntryRowViewModel,
  RegularTimeEntry,
  ChildTimeEntry,
} from 'features/timer/components/TimeEntryViewRow'
import {
  ActiveTimeEntry,
  InactiveTimeEntry,
  TimeEntry,
} from 'features/timer/services/time-entries'
import { numberPad } from 'utils/number'

export function isInactiveTimeEntry(x: TimeEntry): x is InactiveTimeEntry {
  return Boolean(x.projectId) && Boolean(x.timeInterval.end)
}

export function isActiveTimeEntry(x: TimeEntry): x is ActiveTimeEntry {
  return (
    Boolean(x.timeInterval.start) &&
    !(x.timeInterval.end && x.timeInterval.duration)
  )
}

export function isRegularTimeEntry(
  x: TimeEntryRowViewModel,
): x is RegularTimeEntry {
  return x.type === TimeEntryRowType.Regular
}

export function isParentTimeEntry(
  x: TimeEntryRowViewModel,
): x is ParentTimeEntry {
  return x.type === TimeEntryRowType.Parent
}

export function isChildTimeEntry(
  x: TimeEntryRowViewModel,
): x is ChildTimeEntry {
  return x.type === TimeEntryRowType.Child
}

export function timeEntryDuration({ timeInterval }: InactiveTimeEntry): number {
  return differenceInSeconds(
    new Date(timeInterval.end),
    new Date(timeInterval.start),
  )
}

export function formatDurationToInlineTime(duration: number): string {
  const hours = secondsToHours(duration)
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours))
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes)
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`
}

export function formatTimeEntryDate(timeEntry: TimeEntryViewModel): string {
  return `${format(timeEntry.start, 'p')} - ${format(timeEntry.end, 'p')}`
}

export function formatTimEntryInfo(timeEntry: TimeEntryViewModel): string {
  const { task, project } = timeEntry
  if (task && project.clientName) {
    return `${project.name}: ${task}, ${project.clientName}`
  }
  if (task) {
    return `${project.name}: ${task}`
  }
  if (project.clientName) {
    return `${project.name}, ${project.clientName}`
  }
  return `${project.name}`
}

export const activeTimeEntryDuration = (
  activeTimeEntryStart: Date | undefined,
  now = new Date(),
) => (activeTimeEntryStart ? differenceInSeconds(now, activeTimeEntryStart) : 0)

export function formatDate(date: Date): string {
  if (isToday(date)) {
    return 'Today'
  }
  if (isYesterday(date)) {
    return 'Yesterday'
  }
  return date.toLocaleDateString()
}
