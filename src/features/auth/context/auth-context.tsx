import { useQuery } from '@tanstack/react-query';
import { FullPageErrorFallback } from 'components/FullPageErrorFallback';
import { FullPageSpinner } from 'components/FullPageSpinner';
import { User } from 'features/auth/services/user';
import { user, userWorkspaces } from 'features/auth/services/user-info';
import { Workspace } from 'features/auth/services/workspace';
import React from 'react';

function bootstrap() {
  return Promise.all([user(), userWorkspaces()]).then(([user, workspaces]) => ({
    user,
    workspaces,
  }));
}

export type UserInfo = {
  user: User;
  workspaces: Workspace[];
};

const AuthContext = React.createContext<UserInfo | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export function AuthProvider(props: { children: React.ReactNode }) {
  const { status, error, data } = useQuery(['bootstrap'], () => bootstrap(), {
    useErrorBoundary: false,
    retry: false,
  });

  switch (status) {
    case 'error':
      return <FullPageErrorFallback error={error} />;
    case 'loading':
      return <FullPageSpinner />;
    case 'success':
      return (
        <AuthContext.Provider value={data}>
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
