import { useQuery } from '@tanstack/react-query'
import { getTimeEntries } from 'services/time-entries'

export function useTimeEntries(workspaceId: string, userId: string) {
  return useQuery(['timeEntries'], () => {
    return getTimeEntries(workspaceId, userId, { hydrated: true })
  })
}
