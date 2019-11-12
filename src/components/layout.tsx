import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'reakit'
import { ThemeProvider } from 'emotion-theming'
import resolveConfig from 'tailwindcss/resolveConfig'
import Header from './header'
import Footer from './footer'

// @ts-ignore
import tailwindConfig from '../../tailwind.config'

const twConfig = resolveConfig(tailwindConfig)

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={twConfig.theme}>
      <Provider>
        <div className="flex flex-col font-sans min-h-screen text-gray-900">
          <Header />

          <main className="flex flex-col flex-1 md:justify-center max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
            {children}
          </main>

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
