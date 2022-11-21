import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorFallback } from 'common/components/ErrorFallback';
import { AuthProvider } from 'features/auth';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

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
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{props.children}</AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
