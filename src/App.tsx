import { FullPageSpinner } from 'shared/components/FullPageSpinner';
import { useUserInfo } from 'features/auth/context/auth-context';
import React from 'react';

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ 'AuthenticatedApp'),
);

const UnauthenticatedApp = React.lazy(() => import('UnauthenticatedApp'));

function App() {
  const userInfo = useUserInfo();
  console.log('userInfo', userInfo);

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {!userInfo ? <UnauthenticatedApp /> : <AuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;