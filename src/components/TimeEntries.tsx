import { useAuth } from 'context/auth-context'
import { useTimeEntries } from 'hooks/useTimeEntries'
import React from 'react'
import invariant from 'tiny-invariant'

export const TimeEntries: React.FC = () => {
  const { user, workspace } = useAuth()
  invariant(user, 'User must be provided')
  invariant(workspace, 'Workspace must be provided')

  const query = useTimeEntries(workspace.id, user.id)

  switch (query.status) {
    case 'loading':
      return <div>Loading...</div>
    case 'error':
      return <div>Error</div>
    case 'success':
      return (
        <div>
          {query.data.map(timeEntry => (
            <div key={timeEntry.id}>
              {timeEntry.description || 'Empty description'}
            </div>
          ))}
        </div>
      )
  }
}
