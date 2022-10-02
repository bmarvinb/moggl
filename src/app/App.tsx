import { useUserInfo } from 'features/auth/context/auth-context'
import * as O from 'fp-ts/lib/Option'
import React from 'react'
import { darkTheme } from 'core/theme/config'
import { globalStyles } from 'core/theme/globalStyles'
import {
  ColorScheme,
  usePrefersColorScheme,
} from 'core/hooks/usePrefersColorScheme'
import { FullPageSpinner } from 'common/components/FullPageSpinner'

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
