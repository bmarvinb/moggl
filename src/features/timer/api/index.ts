import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'common/utils/url-params';
import { z } from 'zod';
import {
  AddTimeEntryDto,
  CreatedTimeEntryDto,
  createdTimeEntrySchema,
  TimeEntryDto,
  timeEntrySchema,
  UpdateTimeEntryDto,
} from './types';

type TimeEntriesRequestOptions = {
  description?: string;
  start?: string;
  end?: string;
  project?: string;
  task?: string;
  tags?: string;
  'project-required'?: boolean;
  'task-required'?: boolean;
  'in-progress'?: boolean;
  page?: number;
  'page-size'?: number;
};

async function getAll(
  workspaceId: string,
  userId: string,
  options: TimeEntriesRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options, hydrated: true });
  return fetch<TimeEntryDto[]>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    { schema: z.array(timeEntrySchema) },
  );
}

async function add(workspaceId: string, data: AddTimeEntryDto) {
  return fetch<CreatedTimeEntryDto>(`workspaces/${workspaceId}/time-entries`, {
    data,
    schema: createdTimeEntrySchema,
  });
}

async function stop(workspaceId: string, userId: string) {
  return fetch(`workspaces/${workspaceId}/user/${userId}/time-entries`, {
    method: 'PATCH',
    data: {
      end: new Date(),
    },
  });
}

async function update(
  workspaceId: string,
  id: string,
  data: UpdateTimeEntryDto,
) {
  return fetch(`workspaces/${workspaceId}/time-entries/${id}`, {
    method: 'PUT',
    data,
  });
}

async function remove(workspaceId: string, id: string) {
  return fetch(`/workspaces/${workspaceId}/time-entries/${id}`, {
    method: 'DELETE',
  });
}

export const timeEntries = {
  getAll,
  add,
  update,
  remove,
  stop,
};
