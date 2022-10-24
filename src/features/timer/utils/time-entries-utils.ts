import { numberPad } from 'common/utils/number';
import {
  differenceInSeconds,
  format,
  hoursToSeconds,
  isToday,
  isYesterday,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
} from 'date-fns';
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  TimeEntryRowType,
  TimeEntryRowViewModel,
} from 'features/timer/components/TimeEntryViewRow';
import {
  TimeEntryInProgressModel,
  InactiveTimeEntryModel,
  TimeEntryModel,
} from 'features/timer/models/time-entries';
import * as O from 'fp-ts/lib/Option';

export function isTimeEntryFinished(
  x: TimeEntryModel,
): x is InactiveTimeEntryModel {
  return Boolean(x.timeInterval.end);
}

export function isTimeEntryInProgress(
  x: TimeEntryModel,
): x is TimeEntryInProgressModel {
  return (
    Boolean(x.timeInterval.start) &&
    !x.timeInterval.end &&
    !x.timeInterval.duration
  );
}

export function isParentTimeEntry(
  x: TimeEntryRowViewModel,
): x is ParentTimeEntry {
  return x.type === TimeEntryRowType.Parent;
}

export function isChildTimeEntry(
  x: TimeEntryRowViewModel,
): x is ChildTimeEntry {
  return x.type === TimeEntryRowType.Child;
}

export function timeEntryDuration({
  timeInterval,
}: InactiveTimeEntryModel): number {
  return differenceInSeconds(
    new Date(timeInterval.end),
    new Date(timeInterval.start),
  );
}

export function formatDuration(duration: number): string {
  const hours = secondsToHours(duration);
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours));
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes);
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`;
}

export function formatTimeEntryDate(timeEntry: TimeEntryViewModel): string {
  return `${format(timeEntry.start, 'p')} - ${format(timeEntry.end, 'p')}`;
}

export function getTimeEntryInfo(
  project: string,
  client: O.Option<string>,
  task: O.Option<string>,
): string {
  if (O.isSome(task) && O.isSome(client)) {
    return `${project}: ${task.value} (${client.value})`;
  }
  if (O.isSome(task)) {
    return `${project}: ${task.value}`;
  }
  if (O.isSome(client)) {
    return `${project} (${client.value})`;
  }
  return `${project}`;
}

export function formatDate(
  date: Date,
  currentYear = new Date().getFullYear(),
): string {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  const dayOfWeek = format(date, 'iii');
  const day = format(date, 'd');
  const month = format(date, 'MMM');
  const inlineDate = `${dayOfWeek}, ${day} ${month}`;
  return date.getFullYear() !== currentYear
    ? `${inlineDate}, ${date.getFullYear()}`
    : inlineDate;
}
