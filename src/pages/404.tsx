import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Button from '../components/Button'
import PageBanner from '../components/PageBanner'

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <main className="flex flex-col justify-center items-center pb-20 py-10">
        <PageBanner style={{ marginTop: '-10rem', paddingTop: '3rem' }} />
        <h1
          className="text-6xl text-brand mb-10 font-medium mt-15"
          css={css`
            font-size: 13.875rem;
            line-height: 1;
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
    </Layout>
  )
}

export default NotFoundPage
