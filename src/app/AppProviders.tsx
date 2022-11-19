import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from 'features/auth';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorFallback } from 'common/components/ErrorFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {},
  },
  queryCache: new QueryCache({
    onError: error => console.error('Something went wrong:', error),
  }),
});

export const AppProviders = (props: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <AuthProvider>{props.children}</AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
