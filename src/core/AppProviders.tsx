import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'features/auth/context/auth-context';
import {
  ColorScheme,
  usePrefersColorScheme,
} from 'core/hooks/usePrefersColorScheme';
import { darkTheme } from 'core/theme/config';
import { globalStyles } from 'core/theme/globalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

export function applyColorScheme(scheme: ColorScheme): void {
  document.body.className = scheme === 'dark' ? darkTheme : '';
}

export const AppProviders: React.FC<{ children: ReactNode }> = props => {
  const colorScheme = usePrefersColorScheme();
  applyColorScheme(colorScheme);
  globalStyles();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{props.children}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
