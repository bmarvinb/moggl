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
import {
  ChildTimeEntry,
  ParentTimeEntry,
  TimeEntryRowType,
  TimeEntryRowViewModel,
} from 'features/timer/components/TimeEntryViewRow';
import {
  InactiveTimeEntry,
  TimeEntryProject,
  TimeEntryTask,
} from 'features/timer/models/time-entry';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { numberPad } from 'shared/utils/number';

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

export function timeEntryDuration({ start, end }: InactiveTimeEntry): number {
  return differenceInSeconds(end, start);
}

export function formatDuration(duration: number): string {
  const hours = secondsToHours(duration);
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours));
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes);
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`;
}

export function formatTimeEntryDate(start: Date, end: Date): string {
  return `${format(start, 'p')} - ${format(end, 'p')}`;
}

export function getTimeEntryInfo(timeEntry: InactiveTimeEntry) {
  return pipe(
    timeEntry.project,
    O.map(({ clientName, name, color }) => {
      const task = pipe(
        timeEntry.task,
        O.map(({ name }) => name),
        O.getOrElse(() => ''),
      );
      if (task && clientName) {
        return {
          name: `${name}: ${task} (${clientName})`,
          color,
        };
      } else if (task) {
        return {
          name: `${name}: ${task}`,
          color,
        };
      }
      return {
        name,
        color,
      };
    }),
  );

  // if (O.isSome(task) && O.isSome(project)) {
  //   return `${project}: ${task.value} (${client.value})`;
  // }
  // if (O.isSome(task)) {
  //   return `${project}: ${task.value}`;
  // }
  // if (O.isSome(client)) {
  //   return `${project} (${client.value})`;
  // }
  // return `${project}`;
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
