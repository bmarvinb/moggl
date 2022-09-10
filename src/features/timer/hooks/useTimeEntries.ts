import { useQuery } from '@tanstack/react-query'
import { getTimeEntries } from 'features/timer/services/time-entries'

export function useTimeEntries(workspaceId: string, userId: string) {
  return useQuery(
    ['timeEntries'],
    () => getTimeEntries(workspaceId, userId, { 'page-size': 50, page: 1 }),
    {
      onError: e => {
        console.error(e)
      },
    },
  )
}
