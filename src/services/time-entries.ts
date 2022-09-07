import { TimeEntry } from 'services/workspaces'
import { client } from 'utils/api-client'
import { createURLSearchParams } from 'utils'

export function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: { hydrated?: boolean } = {},
): Promise<TimeEntry[]> {
  const params = createURLSearchParams(options)
  return client(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
  )
}
