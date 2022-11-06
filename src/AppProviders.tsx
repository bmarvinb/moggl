import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from 'components/Elements/Button';
import { AuthProvider } from 'features/auth';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorFallback } from 'components/ErrorFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders = (props: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{props.children}</AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
