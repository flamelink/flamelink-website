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
      className="bg-brand w-screen"
      css={css`
        padding: 10rem 1rem 5rem;
        margin-top: -7rem;
        width: 100%;
        background-image: url(${bgPattern.publicURL});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        @media screen and (min-width: 641px) {
          padding-top: 11.25rem;
          padding-bottom: 6.5rem;
        }

        @media screen and (min-width: 1025px) {
          padding-top: 13.25rem;
          padding-bottom: 10.5rem;
        }
      `}
      style={style}
    >
      {title ? (
        <h1 className="text-white font-normal text-4xl sm:text-5xl md:text-6xl leading-none uppercase text-center">
          {title}
        </h1>
      ) : (
        children
      )}
    </section>
  )
}

export default PageBanner
