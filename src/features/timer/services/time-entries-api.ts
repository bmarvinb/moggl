import {
  CreatedTimeEntry,
  createdTimeEntrySchema,
  CreateTimeEntryPayload,
} from 'features/timer/models/created-time-entry';
import {
  TimeEntries,
  timeEntriesSchema,
} from 'features/timer/models/time-entries';
import { client, createURLSearchParams } from 'common/utils/api-client';

export type TimeEntriesRequestOptions = {
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

export async function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: TimeEntriesRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options, hydrated: true });
  return client<TimeEntries>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    { schema: timeEntriesSchema },
  );
}

export async function createTimeEntry(
  workspaceId: string,
  data: CreateTimeEntryPayload,
) {
  return client<CreatedTimeEntry>(`/workspaces/${workspaceId}/time-entries`, {
    data,
    schema: createdTimeEntrySchema,
  });
}
