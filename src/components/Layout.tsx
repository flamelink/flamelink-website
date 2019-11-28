import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'reakit'
import { ThemeProvider } from 'emotion-theming'
import resolveConfig from 'tailwindcss/resolveConfig'
import Header from './Header'
import Footer from './Footer'

// @ts-ignore
import tailwindConfig from '../../tailwind.config'

const twConfig = resolveConfig(tailwindConfig)

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={twConfig.theme}>
      <Provider>
        <div className="flex flex-col antialiased font-sans text-base text-body font-normal min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </Provider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
