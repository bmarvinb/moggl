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
  TimeEntryRowViewModel,
} from 'features/timer/components/TimeEntryViewRow';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { numberPad } from 'shared/utils/number';

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
