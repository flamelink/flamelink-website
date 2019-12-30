import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import SEO from '../components/SEO'
import Button from '../components/Button'
import PageBanner from '../components/PageBanner'

function NotFoundPage() {
  return (
    <>
      <SEO title="404: Not found" description="Flamelink resource not found" />
      <main className="flex flex-col justify-center items-center pb-20 py-10">
        <PageBanner
          style={{
            marginTop: '-10rem',
            paddingTop: 0,
            paddingBottom: '7.5rem'
          }}
        />
        <h1
          className="text-brand mb-10 font-medium mt-15 leading-none"
          css={css`
            font-size: 13.875rem;
          `}
        >
          404
        </h1>
        <h2 className="text-heading text-5xl font-light mb-10">
          Page Not Found
        </h2>
        <p className="mb-10">
          There was an error loading the requested page. We apologize for the
          inconvenience.
        </p>
        <Button variant="contained" color="primary" as={Link} to="/">
          Return To Home
        </Button>
      </main>
    </>
  )
}

export default NotFoundPage
