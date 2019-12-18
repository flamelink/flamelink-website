import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { useStaticQuery, graphql } from 'gatsby'

const UnstyledSection: React.FC<{
  pattern?: boolean
  className?: string
}> = ({ children, pattern, ...props }) => {
  const { bgPattern } = useStaticQuery(graphql`
    query SectionPatternQuery {
      bgPattern: file(name: { eq: "background" }) {
        publicURL
      }
    }
  `)

  return (
    <section
      {...props}
      css={
        pattern &&
        css`
          background-image: url(${bgPattern.publicURL});
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        `
      }
    >
      {children}
    </section>
  )
}

export const Section = styled(UnstyledSection)`
  ${tw`
    w-full
    h-auto
    flex flex-col
    justify-start
    items-center
    overflow-x-hidden
    overflow-y-visible
    py-10 sm:py-20
  `}

  scroll-snap-align: start;
`

export const SectionContainer = tw.div`
  flex
  flex-col
  justify-start
  items-center
  max-w-6xl
  mx-4
`

export const SectionTitle = styled.h2`
  ${tw`
    font-light
    text-center
    text-heading
    text-2xl sm:text-4xl md:text-5xl
  `}

  margin-bottom: 3.125rem;
`
