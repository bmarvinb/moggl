import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useUserInfo } from 'features/auth';
import {
  applyColorScheme,
  usePrefersColorScheme,
} from 'common/hooks/usePrefersColorScheme';
import React from 'react';

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ 'app/AuthenticatedApp'),
);

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

export function App() {
  const userInfo = useUserInfo();
  const colorScheme = usePrefersColorScheme();
  applyColorScheme(colorScheme);
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {!userInfo ? <UnauthenticatedApp /> : <AuthenticatedApp />}
    </React.Suspense>
  );
}
