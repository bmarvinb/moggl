import { FullPageSpinner } from 'components/FullPageSpinner';
import { useUserInfo } from 'features/auth/context/auth-context';
import React from 'react';
import {
  applyColorScheme,
  usePrefersColorScheme,
} from 'hooks/prefersColorScheme';

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ 'AuthenticatedApp'),
);

const UnauthenticatedApp = React.lazy(() => import('UnauthenticatedApp'));

function App() {
  const userInfo = useUserInfo();
  const colorScheme = usePrefersColorScheme();
  applyColorScheme(colorScheme);
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {!userInfo ? <UnauthenticatedApp /> : <AuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
