import { FullPageSpinner } from 'components/FullPageSpinner';
import { useUserInfo } from 'features/auth';
import {
  applyColorScheme,
  usePrefersColorScheme,
} from 'hooks/usePrefersColorScheme';
import React from 'react';

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
