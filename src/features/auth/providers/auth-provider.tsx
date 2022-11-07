import { useQuery } from '@tanstack/react-query';
import { ErrorFallback } from 'common/components/ErrorFallback';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import React from 'react';
import { User } from '../services/user';
import { user, userWorkspaces } from '../services/user-info';
import { Workspace } from '../services/workspace';

// TODO: use react-query
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
      return <ErrorFallback />;
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
