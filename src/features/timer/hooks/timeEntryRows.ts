import { max, min } from 'date-fns';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  RegularTimeEntry,
  TimeEntryRow,
} from 'features/timer/components/TimeEntryViewRow';
import {
  isParentTimeEntry,
  TimeEntryRowType,
} from 'features/timer/hooks/selection';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';

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
  type: TimeEntryRowType.Child,
  siblings,
  data,
});

const createRegularTimeEntry = (
  data: CompletedTimeEntry,
): RegularTimeEntry => ({
  type: TimeEntryRowType.Regular,
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
    type: TimeEntryRowType.Parent,
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

export function useTimeEntryRows(completed: CompletedTimeEntry[]) {
  const timeEntryRows = completed.reduce((acc, timeEntry) => {
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

  return timeEntryRows;
}
