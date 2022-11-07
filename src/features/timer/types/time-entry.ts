import { differenceInSeconds } from 'date-fns';
import { TimeEntryDTO } from '../api/timer-dtos';

export type TimeEntryType = 'INACTIVE' | 'ACTIVE';

export type TimeEntryTask = {
  id: string;
  name: string;
};

export type TimeEntryProject = {
  id: string;
  name: string;
  color: string;
  clientName: string | undefined;
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
  task: TimeEntryTask | undefined;
  project: TimeEntryProject | undefined;
};

export type CompletedTimeEntry = TimeEntryCommon & {
  type: 'COMPLETED';
  end: Date;
  duration: number;
};

export type ActiveTimeEntry = TimeEntryCommon & { type: 'ACTIVE' };

export type TimeEntry = CompletedTimeEntry | ActiveTimeEntry;

export function toTimeEntry(dto: TimeEntryDTO): TimeEntry {
  const common: TimeEntryCommon = {
    id: dto.id,
    start: new Date(dto.timeInterval.start),
    description: dto.description,
    billable: dto.billable,
    tags: dto.tags.map(tag => ({ id: tag.id, name: tag.name })),
    task: dto.task ? { id: dto.task.id, name: dto.task.name } : undefined,
    project: dto.project
      ? {
          id: dto.project.id,
          name: dto.project.name,
          color: dto.project.color,
          clientName: dto.project.clientName || undefined,
        }
      : undefined,
  };
  if (dto.timeInterval.end) {
    return {
      ...common,
      type: 'COMPLETED',
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

export function isCompletedTimeEntry(
  timeEntry: TimeEntry,
): timeEntry is CompletedTimeEntry {
  return timeEntry.type === 'COMPLETED';
}
