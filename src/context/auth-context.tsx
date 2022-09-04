import {useQuery} from '@tanstack/react-query'
import * as auth from 'api/auth'
import {User} from 'api/auth/types'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'
import React, {useEffect, useState} from 'react'
import {getApiToken} from 'utils/api-key-storage'

const AuthContext = React.createContext<{
  login: typeof auth.login
  logout: typeof auth.logout
  user: User | undefined
}>({
  login: auth.login,
  logout: auth.logout,
  user: undefined,
})
AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: {children: JSX.Element}) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [apiToken, setApiToken] = useState<string | undefined>()

  useEffect(() => {
    setApiToken(getApiToken() || undefined)
  }, [])

  const {fetchStatus, status, error} = useQuery(
    ['user', apiToken],
    () => auth.me(apiToken as string),
    {
      onSettled: setUser,
      enabled: typeof apiToken === 'string',
    },
  )

  const login = async (email: string, password: string) => {
    const session = await auth.login(email, password)
    const user = await auth.me(session.api_token)
    setUser(user)
    return session
  }

  const logout = async () => auth.logout().then(() => setUser(undefined))

  const value = {
    user: user?.id ? user : undefined,
    login,
    logout,
  }

  if (fetchStatus === 'idle') {
    return (
      <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
    )
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
