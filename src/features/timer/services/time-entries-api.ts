import {
  CreatedTimeEntry,
  createdTimeEntrySchema,
  CreateTimeEntryPayload,
} from 'features/timer/services/created-time-entry';
import {
  TimeEntries,
  TimeEntriesRequestOptions,
  timeEntriesSchema,
} from 'features/timer/services/time-entries';
import { client, createURLSearchParams } from 'common/utils/api-client';

export async function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: TimeEntriesRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options, hydrated: true });
  return client<TimeEntries>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    timeEntriesSchema,
  );
}

export async function createTimeEntry(
  workspaceId: string,
  data: CreateTimeEntryPayload,
) {
  return client<CreatedTimeEntry>(
    `/workspaces/${workspaceId}/time-entries`,
    createdTimeEntrySchema,
    { data },
  );
}
