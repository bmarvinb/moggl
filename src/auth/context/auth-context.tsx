import { useQuery } from '@tanstack/react-query'
import { FullPageErrorFallback, FullPageSpinner } from 'components'
import React, { ReactNode, useState } from 'react'
import { User, me } from 'auth/services/auth'
import { Workspace, getWorkspaces } from 'services/workspaces'

function bootstrap() {
  return Promise.all([me(), getWorkspaces()])
}

const AuthContext = React.createContext<{
  user: User | undefined
  workspace: Workspace | undefined
}>({
  user: undefined,
  workspace: undefined,
})
AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const { status, error } = useQuery(['bootstrap'], () => bootstrap(), {
    onSuccess: ([user, workspaces]) => {
      setUser(user)
      setWorkspaces(workspaces)
    },
  })

  const workspace = workspaces.find(
    workspace => workspace.id === user?.activeWorkspace,
  )!

  const value = {
    user: undefined,
    workspace,
  }

  switch (status) {
    case 'error':
      return <FullPageErrorFallback error={error} />
    case 'loading':
      return <FullPageSpinner />
    case 'success':
      return (
        <AuthContext.Provider value={value}>
          {props.children}
        </AuthContext.Provider>
      )
  }
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
