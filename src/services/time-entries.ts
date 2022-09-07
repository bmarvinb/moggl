import { TimeEntry } from 'services/workspaces'
import { client } from 'utils/api-client'

export function getTimeEntries(
  workspaceId: string,
  userId: string,
): Promise<TimeEntry[]> {
  return client(`workspaces/${workspaceId}/user/${userId}/time-entries`)
}
