import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'auth/context/auth-context'

const queryClient = new QueryClient()

export const AppProviders: React.FC<{ children: ReactNode }> = props => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{props.children}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
