import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useUserInfo } from 'features/auth/context/auth-context';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
);

const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const userInfo = useUserInfo();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {pipe(
        userInfo,
        O.match(
          () => <UnauthenticatedApp />,
          userInfo => <AuthenticatedApp userInfo={userInfo} />,
        ),
      )}
    </React.Suspense>
  );
}

export default App;
