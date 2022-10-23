import {
  CreatedTimeEntryModel,
  createdTimeEntrySchema,
  NewTimeEntryModel,
  TimeEntriesModel,
  timeEntriesSchema,
  UpdateTimeEntryRequestData,
} from 'features/timer/models/time-entries';
import { client } from 'common/utils/api-client';
import { createURLSearchParams } from 'common/utils/url-params';

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
  return client<TimeEntriesModel>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    { schema: timeEntriesSchema },
  );
}

export async function createTimeEntry(
  workspaceId: string,
  data: Omit<NewTimeEntryModel, 'id'>,
) {
  return client<CreatedTimeEntryModel>(
    `workspaces/${workspaceId}/time-entries`,
    {
      data,
      schema: createdTimeEntrySchema,
    },
  );
}

export async function stopTimeEntry(workspaceId: string, userId: string) {
  return client(`workspaces/${workspaceId}/user/${userId}/time-entries`, {
    method: 'PATCH',
    data: {
      end: new Date(),
    },
  });
}

export async function updateTimeEntry(
  workspaceId: string,
  id: string,
  data: UpdateTimeEntryRequestData,
) {
  return client(`workspaces/${workspaceId}/time-entries/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteTimeEntry(workspaceId: string, id: string) {
  return client(`/workspaces/${workspaceId}/time-entries/${id}`, {
    method: 'DELETE',
  });
}
