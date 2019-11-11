import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col font-sans min-h-screen text-gray-900">
      <Header />

      <main className="flex flex-col flex-1 md:justify-center max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
        {children}
      </main>

      <footer className="bg-blue-700">
        <nav className="flex justify-between max-w-4xl mx-auto p-4 md:p-8 text-sm">
          <p className="text-white">
            Created by{' '}
            <a
              className="font-bold no-underline text-white"
              href="https://jperasmus.me"
            >
              JP Erasmus
            </a>
          </p>

          <p>
            <a
              className="font-bold no-underline text-white"
              href="https://github.com/jperasmus/flamelink-website"
            >
              GitHub
            </a>
          </p>
        </nav>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
