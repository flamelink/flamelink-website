import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'reakit'
import { ThemeProvider } from 'emotion-theming'
import resolveConfig from 'tailwindcss/resolveConfig'

// @ts-ignore
import tailwindConfig from '../../tailwind.config'

const twConfig = resolveConfig(tailwindConfig)

const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={twConfig.theme}>
      <Provider>{children}</Provider>
    </ThemeProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProviders
