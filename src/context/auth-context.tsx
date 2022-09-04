import React, {useEffect, useState} from 'react'
import * as auth from 'api/auth'
import {User} from 'api/auth/types'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'
import {getApiToken, removeApiToken, setApiToken} from 'utils/api-key-storage'
import {assertNever} from 'utils/assert-never'
import {
  error,
  idle,
  isSuccess,
  loading,
  RemoteData,
  RemoteDataStatus,
  success,
} from 'utils/remote-data'

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
  const [user, setUser] = useState<RemoteData<User>>(idle())

  useEffect(() => {
    const apiToken = getApiToken()
    if (!apiToken) {
      return
    }
    setUser(loading())
    auth
      .me(apiToken)
      .then(data => setUser(success(data)))
      .catch(e => setUser(error(e)))
  }, [])

  const login = async (email: string, password: string) => {
    const session = await auth.login(email, password)
    console.log('session', session)

    const data = await auth.me(session.api_token)
    setUser({
      status: RemoteDataStatus.Success,
      data,
    })
    setApiToken(session.api_token)
    return session
  }

  const logout = async () =>
    auth.logout().then(() => {
      setUser({status: RemoteDataStatus.Idle})
      removeApiToken()
    })

  const value = {
    user: isSuccess(user) ? user.data : undefined,
    login,
    logout,
  }

  switch (user.status) {
    case RemoteDataStatus.Loading:
      return <FullPageSpinner />
    case RemoteDataStatus.Error:
      return <FullPageErrorFallback error={user.error} />
    case RemoteDataStatus.Idle:
    case RemoteDataStatus.Success:
      return (
        <AuthContext.Provider value={value}>
          {props.children}
        </AuthContext.Provider>
      )
    default:
      return assertNever(user)
  }
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
