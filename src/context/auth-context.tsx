import { useQuery } from '@tanstack/react-query'
import { FullPageErrorFallback, FullPageSpinner } from 'components/common'
import React, { ReactNode, useState } from 'react'
import { User, me } from 'services/auth'
import { Workspace, getWorkspaces } from 'services/workspaces'

function bootstrap() {
  return Promise.all([me(), getWorkspaces()])
}

const AuthContext = React.createContext<{
  login: (email: string, password: string) => Promise<void>
  user: User | undefined
}>({
  login: () => Promise.resolve(),
  user: undefined,
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

  const login = async (_email: string, _password: string) => {
    return Promise.resolve()
  }

  const value = {
    user,
    workspaces,
    login,
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
