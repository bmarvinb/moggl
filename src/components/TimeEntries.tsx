import { Spinner } from 'components/common'
import { useAuth } from 'context/auth-context'
import { useTimeEntries } from 'hooks/useTimeEntries'
import React from 'react'
import { invariant } from 'utils'

export const TimeEntries: React.FC = () => {
  const { user, workspace } = useAuth()
  invariant(user, 'User must be provided')
  invariant(workspace, 'Workspace must be provided')

  const { status, data } = useTimeEntries(workspace.id, user.id)

  switch (status) {
    case 'loading':
      return <Spinner />
    case 'error':
      return <div>Error</div>
    case 'success':
      return (
        <div>
          {data.map(timeEntry => (
            <div key={timeEntry.id}>
              {timeEntry.description || 'Empty description'}
            </div>
          ))}
        </div>
      )
  }
}
