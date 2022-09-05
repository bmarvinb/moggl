import {useQuery} from '@tanstack/react-query'
import {FullPageErrorFallback, FullPageSpinner} from 'components/common'
import React, {useState} from 'react'
import * as authService from 'services/auth'
import {User} from 'services/auth'
import {getApiToken} from 'utils/api-key-storage'

const AuthContext = React.createContext<{
  login: typeof authService.login
  logout: typeof authService.logout
  user: User | undefined
}>({
  login: authService.login,
  logout: authService.logout,
  user: undefined,
})
AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: {children: JSX.Element}) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const apiToken = getApiToken()

  const {fetchStatus, status, error} = useQuery(
    ['user', apiToken],
    () => authService.me(apiToken as string),
    {
      onSettled: setUser,
      enabled: typeof apiToken === 'string',
    },
  )

  const login = async (email: string, password: string) => {
    const session = await authService.login(email, password)
    const user = await authService.me(session.api_token)
    setUser(user)
    return session
  }

  const logout = async () => authService.logout().then(() => setUser(undefined))

  const value = {
    user,
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
