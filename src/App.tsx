import { useUserInfo } from 'auth/context/auth-context'
import { FullPageSpinner } from 'components'
import * as O from 'fp-ts/lib/Option'
import React from 'react'
import { globalStyles } from 'theme/globalStyles'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
  const userInfo = useUserInfo()
  globalStyles()
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
