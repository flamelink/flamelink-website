import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'reakit/Box'
import get from 'lodash/get'
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions'
import AppProviders from '../components/AppProviders'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

type LayoutProps = {
  location: unknown
  children: React.ReactNode
}

const TRANSITION_SPRING_CONFIG = {
  mass: 1,
  tension: 210,
  friction: 25,
  clamp: true
}

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  return (
    <AppProviders>
      {(theme: unknown) => (
        <ErrorBoundary>
          <Box className="flex flex-col antialiased font-sans text-base text-body font-normal min-h-screen">
            <TransitionProvider
              location={location}
              mode="immediate"
              enter={{
                opacity: 0,
                transform: get(theme, 'device.prefersReducedMotion', false)
                  ? 'translate3d(0, -100vh, 0)'
                  : 'translate3d(0, -100vh, 0)',
                config: TRANSITION_SPRING_CONFIG
              }}
              usual={{
                opacity: 1,
                transform: 'translate3d(0, 0vh, 0)'
              }}
              leave={{
                opacity: 0,
                transform: get(theme, 'device.prefersReducedMotion', false)
                  ? 'translate3d(0, -100vh, 0)'
                  : 'translate3d(0, 100vh, 0)',
                config: TRANSITION_SPRING_CONFIG
              }}
            >
              <Header />
              <TransitionViews>{children}</TransitionViews>
              <Footer />
            </TransitionProvider>
          </Box>
        </ErrorBoundary>
      )}
    </AppProviders>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
