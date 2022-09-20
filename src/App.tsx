import React from 'react'
import { FullPageSpinner } from 'components'
import { useUserInfo } from 'auth/context/auth-context'
import * as O from 'fp-ts/lib/Option'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
  const userInfo = useUserInfo()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {O.isSome(userInfo) ? (
        <AuthenticatedApp userInfo={userInfo.value} />
      ) : (
        <UnauthenticatedApp />
      )}
    </React.Suspense>
  )
}

export default App
