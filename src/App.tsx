import React from 'react'
import { FullPageSpinner } from 'components/common'
import { useAuth } from 'context/auth-context'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
  const { user } = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
