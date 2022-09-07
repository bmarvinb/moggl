import React, { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme } from 'theme'

export const ThemeProvider: React.FC<{ children: ReactNode }> = props => {
  const theme = lightTheme
  return (
    <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
  )
}
