import { useQuery } from '@tanstack/react-query';
import { FullPageErrorFallback } from 'common/components/FullPageErrorFallback';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { User } from 'features/auth/services/user';
import { user, userWorkspaces } from 'features/auth/services/user-info';
import { Workspace } from 'features/auth/services/workspace';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as NEA from 'fp-ts/lib/NonEmptyArray';
import * as O from 'fp-ts/lib/Option';
import React, { useState } from 'react';

function bootstrap() {
  return Promise.all([user(), userWorkspaces()]);
}

export type UserInfo = {
  user: User;
  workspace: Workspace;
};

const AuthContext = React.createContext<O.Option<UserInfo>>(O.none);
AuthContext.displayName = 'AuthContext';

export function AuthProvider(props: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<O.Option<UserInfo>>(O.none);

  const { status, error } = useQuery(['bootstrap'], () => bootstrap(), {
    onSuccess: ([user, workspaces]) => {
      const workspace = pipe(
        workspaces,
        A.findFirst(workspace => workspace.id === user.activeWorkspace),
        O.getOrElse(() => NEA.head(workspaces)),
      );
      setUserInfo(
        O.some({
          user,
          workspace,
        }),
      );
    },
  });

  switch (status) {
    case 'error':
      return <FullPageErrorFallback error={error} />;
    case 'loading':
      return <FullPageSpinner />;
    case 'success':
      return (
        <AuthContext.Provider value={userInfo}>
          {props.children}
        </AuthContext.Provider>
      );
  }
}

export function useUserInfo() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUserInfo must be used within a AuthProvider`);
  }
  return context;
}
