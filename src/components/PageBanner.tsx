import React from 'react'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  title?: string
  style?: React.CSSProperties
}

const PageBanner: React.FC<Props> = ({ title, children, style }) => {
  const { bgPattern } = useStaticQuery(graphql`
    query PageBannerQueries {
      bgPattern: file(name: { eq: "background" }) {
        publicURL
      }
    }
  `)

  return (
    <section
      id="pageBanner"
      className="bg-brand w-screen"
      css={css`
        padding-top: 13.25rem;
        padding-bottom: 10.5rem;
        width: 100%;
        background-image: url(${bgPattern.publicURL});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      `}
      style={{ marginTop: '-7rem', ...(style || {}) }}
    >
      {title ? (
        <h1 className="text-white font-normal text-5xl uppercase text-center">
          {title}
        </h1>
      ) : (
        children
      )}
    </section>
  )
}

export default PageBanner
