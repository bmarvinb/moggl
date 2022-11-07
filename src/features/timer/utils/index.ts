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
import { numberPad } from 'utils/number';
import { CompletedTimeEntry } from '../types/time-entry';

export function timeEntryDuration({ start, end }: CompletedTimeEntry): number {
  return differenceInSeconds(end, start);
}

export function formatTimeEntryDuration(duration: number): string {
  const hours = secondsToHours(duration);
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours));
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes);
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`;
}

export function formatTimeEntryDate(start: Date, end: Date): string {
  return `${format(start, 'p')} - ${format(end, 'p')}`;
}

// TODO: implement
export function getTimeEntryInfo(timeEntry: CompletedTimeEntry) {
  return timeEntry.project?.name || 'No info';
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

export function calculateDuration(entries: CompletedTimeEntry[]): number {
  return entries.map(timeEntryDuration).reduce((acc, val) => acc + val, 0);
}
