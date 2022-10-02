import { useUserInfo } from 'auth/context/auth-context'
import { FullPageSpinner } from 'components'
import * as O from 'fp-ts/lib/Option'
import React from 'react'
import { darkTheme } from 'theme/config'
import { globalStyles } from 'theme/globalStyles'
import {
  ColorScheme,
  usePrefersColorScheme,
} from 'theme/hooks/usePrefersColorScheme'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function applyColorScheme(scheme: ColorScheme): void {
  document.body.className = scheme === 'dark' ? darkTheme : ''
}

function App() {
  const userInfo = useUserInfo()
  const colorScheme = usePrefersColorScheme()
  applyColorScheme(colorScheme)
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
