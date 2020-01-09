import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ExtendedError } from '@sentry/types'
import { css } from '@emotion/core'
import Button from './Button'

type Props = {}

type State = {
  hasError: boolean
  eventId?: string
}

type ErrorInfo = {
  [key: string]: any
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { eventId: undefined, hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: ExtendedError, errorInfo: ErrorInfo) {
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.withScope(scope => {
        scope.setExtras(errorInfo)
        const eventId = window.Sentry.captureException(error)
        this.setState({ eventId })
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <StaticQuery
          query={graphql`
            query {
              bgPattern: file(name: { eq: "background" }) {
                publicURL
              }
            }
          `}
          render={data => (
            <main
              className="flex flex-col justify-center bg-brand items-center h-screen w-screen text-white font-thin"
              css={css`
                width: 100%;
                background-image: url(${data.bgPattern.publicURL});
                background-position: top center;
                background-repeat: no-repeat;
                background-size: cover;
              `}
            >
              <p className="mb-8">An unexpected error occurred. Please tell us about it.</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  window.Sentry.showReportDialog({ eventId: this.state.eventId })
                }
              >
                Report feedback
              </Button>
            </main>
          )}
        />
      )
    }

    // when there's not an error, render children untouched
    return this.props.children
  }
}

export default ErrorBoundary
