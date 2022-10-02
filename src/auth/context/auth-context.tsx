import { useQuery } from '@tanstack/react-query'
import { User } from 'auth/services/user'
import { Workspace } from 'auth/services/workspace'
import { userWorkspaces, user } from 'auth/services/user-info'
import { FullPageErrorFallback, FullPageSpinner } from 'components'
import { sequenceS } from 'fp-ts/lib/Apply'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import React, { useState } from 'react'

function bootstrap() {
  return Promise.all([user(), userWorkspaces()])
}

export type UserInfo = {
  user: User
  workspace: Workspace
}

const AuthContext = React.createContext<O.Option<UserInfo>>(O.none)
AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<O.Option<User>>(O.none)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const { status, error } = useQuery(['bootstrap'], () => bootstrap(), {
    onSuccess: ([user, workspaces]) => {
      setUser(O.some(user))
      setWorkspaces(workspaces)
    },
  })

  const workspace = pipe(
    user,
    O.chain(user =>
      pipe(
        workspaces,
        A.findFirst(workspace => workspace.id === user.activeWorkspace),
      ),
    ),
  )

  const value = pipe(sequenceS(O.Apply)({ user, workspace }))

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

export function useUserInfo() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
