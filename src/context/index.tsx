import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React, {ReactNode} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './auth-context'
import {ThemeProvider} from './theme-provider'

const queryClient = new QueryClient()

export const AppProviders: React.FC<{children: ReactNode}> = props => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>{props.children}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
