import React from 'react'
import PropTypes from 'prop-types'
import AppProviders from './AppProviders'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <AppProviders>
      <div className="flex flex-col antialiased font-sans text-base text-body font-normal min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </AppProviders>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
