import { format, isSameDay, max, min } from 'date-fns';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRow,
} from '../components/TimeEntryViewRow';
import { CompletedTimeEntry } from '../models/time-entry';
import { calculateDuration } from '../utils/time-entries-utils';
import { isParentTimeEntry } from './useSelection';

const getParentChildren = (
  timeEntry: CompletedTimeEntry,
  timeEntries: CompletedTimeEntry[],
) =>
  timeEntries.filter(
    comparedTimeEntry =>
      timeEntry.description === comparedTimeEntry.description, // TODO: implement algorithm
  );

const createChild = (
  data: CompletedTimeEntry,
  siblings: number,
): ChildTimeEntry => ({
  type: 'child',
  siblings,
  data,
});

const createRegularTimeEntry = (
  data: CompletedTimeEntry,
): RegularTimeEntry => ({
  type: 'regular',
  data,
});

const restTimeEntries = (
  data: CompletedTimeEntry[],
  timeEntry: CompletedTimeEntry,
) => data.filter(({ id }) => id !== timeEntry.id);

const createParentChildren = (
  data: CompletedTimeEntry[],
  timeEntry: CompletedTimeEntry,
) => {
  const rest = restTimeEntries(data, timeEntry);
  const children = getParentChildren(timeEntry, rest);
  const siblings = children.length;
  return [
    createChild(timeEntry, siblings),
    ...children.map(child => createChild(child, siblings)),
  ];
};

const calculateParentStartDate = (children: ChildTimeEntry[]): Date =>
  min(children.map(({ data }) => data.start));

const calculateParentEndDate = (children: ChildTimeEntry[]): Date =>
  max(children.map(({ data }) => data.end));

const calculateParentDuration = (children: ChildTimeEntry[]): number =>
  children.map(({ data }) => data.duration).reduce((acc, val) => acc + val, 0);

const createParentTimeEntry = (
  data: CompletedTimeEntry[],
  timeEntry: CompletedTimeEntry,
): ParentTimeEntry => {
  const children = createParentChildren(data, timeEntry);
  return {
    type: 'parent',
    data: {
      ...timeEntry,
      start: calculateParentStartDate(children),
      end: calculateParentEndDate(children),
      duration: calculateParentDuration(children),
    },
    children,
  };
};

const isParent = (
  data: CompletedTimeEntry[],
  timeEntry: CompletedTimeEntry,
): boolean =>
  restTimeEntries(data, timeEntry).some(
    comparedTimeEntry =>
      timeEntry.description === comparedTimeEntry.description, // TODO: implement algorithm
  );

const isChild = (
  timeEntry: CompletedTimeEntry,
  timeEntries: ParentTimeEntry[],
): boolean =>
  timeEntries.some(({ children }) =>
    children.some(({ data }) => data.id === timeEntry.id),
  );

function getTimeEntryRows(completed: CompletedTimeEntry[]) {
  return completed.reduce((acc, timeEntry) => {
    const data = acc.filter(isParentTimeEntry);
    const isChildrenTimeEntry = isChild(timeEntry, data);

    return isChildrenTimeEntry
      ? acc
      : [
          ...acc,
          isParent(completed, timeEntry)
            ? createParentTimeEntry(completed, timeEntry)
            : createRegularTimeEntry(timeEntry),
        ];
  }, [] as TimeEntryRow[]);
}

function getStartDays(timeEntry: CompletedTimeEntry[]): string[] {
  return timeEntry.map(({ start }) => format(start, 'PP'));
}

export type ReportedDay = {
  id: string;
  date: Date;
  reportedDuration: number;
  data: TimeEntryRow[];
};

export function useReportedDays(
  timeEntries: CompletedTimeEntry[],
): ReportedDay[] {
  const dates = [...new Set(getStartDays(timeEntries))];
  return dates.map(date => {
    const dayTimeEntries = timeEntries.filter(({ start }) =>
      isSameDay(start, new Date(date)),
    );
    return {
      id: date,
      date: new Date(date),
      reportedDuration: calculateDuration(dayTimeEntries),
      data: getTimeEntryRows(dayTimeEntries),
    };
  });
}
