import {
  CreatedTimeEntry,
  createdTimeEntrySchema,
  CreateTimeEntryPayload,
} from 'features/timer/types/created-time-entry'
import {
  TimeEntries,
  TimeEntriesRequestOptions,
  timeEntriesSchema,
} from 'features/timer/types/time-entries'
import { client, createURLSearchParams } from 'utils/api-client'

export async function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: TimeEntriesRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options, hydrated: true })
  return client<TimeEntries>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    timeEntriesSchema,
  )
}

export async function createTimeEntry(
  workspaceId: string,
  data: CreateTimeEntryPayload,
) {
  return client<CreatedTimeEntry>(
    `/workspaces/${workspaceId}/time-entries`,
    createdTimeEntrySchema,
    { data },
  )
}
