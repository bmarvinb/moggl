import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'features/auth/context/auth-context';
import { ColorScheme, usePrefersColorScheme } from 'theme/prefersColorScheme';
import { globalStyles } from 'theme/globalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

export function applyColorScheme(scheme: ColorScheme): void {
  const enableDarkMode = scheme === ColorScheme.Dark;
  enableDarkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}

export const AppProviders = (props: { children: React.ReactNode }) => {
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
