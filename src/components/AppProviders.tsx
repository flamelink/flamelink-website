import React from 'react'
import { Provider } from 'reakit'
import { ThemeProvider } from 'emotion-theming'
import { useTheme } from '../hooks/theme'

const AppProviders: React.FC = ({ children }) => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Provider>
        {typeof children === 'function' ? children(theme) : children}
      </Provider>
    </ThemeProvider>
  )
}

export default AppProviders
