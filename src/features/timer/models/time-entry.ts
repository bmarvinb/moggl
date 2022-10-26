import { differenceInSeconds } from 'date-fns';
import { TimeEntryDTO } from 'features/timer/services/time-entry-dtos';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

export type TimeEntryType = 'INACTIVE' | 'ACTIVE';

export type TimeEntryTask = {
  id: string;
  name: string;
};

export type TimeEntryProject = {
  id: string;
  name: string;
  color: string;
  clientName: string;
};

type TimeEntryCommon = {
  id: string;
  start: Date;
  description: string;
  billable: boolean;
  tags: {
    id: string;
    name: string;
  }[];
  task: O.Option<TimeEntryTask>;
  project: O.Option<TimeEntryProject>;
};

export type InactiveTimeEntry = TimeEntryCommon & {
  type: 'INACTIVE';
  end: Date;
  duration: number;
};

export type ActiveTimeEntry = TimeEntryCommon & { type: 'ACTIVE' };

export type TimeEntry = InactiveTimeEntry | ActiveTimeEntry;

export function toTimeEntry(dto: TimeEntryDTO): TimeEntry {
  const common: TimeEntryCommon = {
    id: dto.id,
    start: new Date(dto.timeInterval.start),
    description: dto.description,
    billable: dto.billable,
    tags: dto.tags.map(tag => ({ id: tag.id, name: tag.name })),
    task: pipe(
      dto.task,
      O.fromNullable,
      O.map(task => ({ id: task.id, name: task.name })),
    ),
    project: pipe(
      dto.project,
      O.fromNullable,
      O.map(project => ({
        id: project.id,
        name: project.name,
        color: project.color,
        clientName: project.clientName || '',
      })),
    ),
  };
  if (dto.timeInterval.end) {
    return {
      ...common,
      type: 'INACTIVE',
      end: new Date(dto.timeInterval.end),
      duration: differenceInSeconds(
        new Date(dto.timeInterval.end),
        new Date(dto.timeInterval.start),
      ),
    };
  }
  return { ...common, type: 'ACTIVE' };
}

export function isActiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is ActiveTimeEntry {
  return timeEntry.type === 'ACTIVE';
}

export function isInactiveTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is InactiveTimeEntry {
  return timeEntry.type === 'INACTIVE';
}
