import React from 'react'
import { Provider } from 'reakit'
import { ThemeProvider } from 'emotion-theming'
import { HelmetProvider } from 'react-helmet-async'
import { useTheme } from '../hooks/theme'

const AppProviders: React.FC = ({ children }) => {
  const theme = useTheme()

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Provider>
          {typeof children === 'function' ? children(theme) : children}
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default AppProviders
