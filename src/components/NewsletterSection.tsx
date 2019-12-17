import React from 'react'
import Img from 'gatsby-image'
import get from 'lodash/get'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { Box } from 'reakit/Box'
import { Section, SectionContainer, SectionTitle } from './Section'
import VisibilityObserver, {
  VisibilityObserverPayload
} from './VisibilityObserver'
import { graphql, useStaticQuery } from 'gatsby'

const Envelope = styled.div`
  ${tw`right-0 bottom-0 absolute z-0`}
`

type Props = {
  data: unknown
}

const NewsletterSection: React.FC<Props> = ({ data }) => {
  const { newsletterEnvelope } = useStaticQuery(graphql`
    query NewsletterSection {
      # Envelope image used for Newsletter Section
      newsletterEnvelope: file(name: { eq: "envelope" }) {
        childImageSharp {
          fluid(maxWidth: 768) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <VisibilityObserver threshold={0.45} once>
      {({ isIntersecting }: VisibilityObserverPayload) => (
        <Section
          className="bg-gray-100"
          css={css`
            ${tw`relative overflow-visible sm:pt-23 sm:pb-25`}
          `}
        >
          <Box
            css={css`
              ${tw`z-10`}
            `}
          >
            <SectionContainer>
              <SectionTitle
                css={css`
                  ${tw`text-brand mb-9`}
                `}
              >
                {get(data, 'title', '')}
              </SectionTitle>
              <input
                type="email"
                name="newsletter"
                className="py-4 px-5 sm:py-5 sm:px-8 w-full text-3xl sm:text-4xl mb-10 placeholder-gray-400"
                placeholder={get(data, 'placeholderText', '')}
              />
              <p className="text-center">{get(data, 'excerpt', '')}</p>
            </SectionContainer>
          </Box>
          <Envelope
            css={css`
              width: 0%;
              transition: ${isIntersecting
                ? 'all 350ms ease-out'
                : 'all 190ms ease-in'};
              transform: ${isIntersecting
                ? 'translateX(0%)'
                : 'translateX(100%)'};
              opacity: ${isIntersecting ? 1 : 0};

              @media screen and (min-width: 960px) {
                width: 50%;
              }

              @media screen and (min-width: 1040px) {
                width: 55%;
              }

              @media screen and (min-width: 1065px) {
                width: 52%;
              }

              @media screen and (min-width: 1090px) {
                width: 50%;
              }

              @media screen and (min-width: 1120px) {
                width: 49%;
              }

              @media screen and (min-width: 1140px) {
                width: 48%;
              }

              @media screen and (min-width: 1160px) {
                width: 47%;
              }

              @media screen and (min-width: 1180px) {
                width: 46%;
              }

              @media screen and (min-width: 1200px) {
                width: 45%;
              }

              @media screen and (min-width: 1240px) {
                width: 44%;
              }

              @media screen and (min-width: 1270px) {
                width: 43%;
              }

              @media screen and (min-width: 1300px) {
                width: 42%;
              }

              @media screen and (min-width: 1330px) {
                width: 41%;
              }

              @media screen and (min-width: 1360px) {
                width: 40%;
              }

              @media screen and (min-width: 1385px) {
                width: 39%;
              }

              @media screen and (min-width: 1420px) {
                width: 38%;
              }

              @media screen and (min-width: 1440px) {
                width: 37%;
              }

              @media screen and (min-width: 1505px) {
                width: 36%;
              }

              @media screen and (min-width: 1588px) {
                width: 35%;
              }

              @media screen and (min-width: 1594px) {
                width: 36%;
              }

              @media screen and (min-width: 1615px) {
                width: 35%;
              }

              @media screen and (min-width: 1645px) {
                width: 36%;
              }

              @media screen and (min-width: 1652px) {
                width: 35%;
              }

              @media screen and (min-width: 1675px) {
                width: 34%;
              }

              @media screen and (min-width: 1715px) {
                width: 33%;
              }

              @media screen and (min-width: 1740px) {
                width: 32%;
              }

              @media screen and (min-width: 1795px) {
                width: 31%;
              }

              @media screen and (min-width: 1840px) {
                width: 30%;
              }

              @media screen and (min-width: 1900px) {
                width: 29%;
              }

              @media screen and (min-width: 1960px) {
                width: 28%;
              }

              @media screen and (min-width: 2020px) {
                width: 27%;
              }

              @media screen and (min-width: 2041px) {
                width: 0%;
              }
            `}
          >
            <Img fluid={newsletterEnvelope.childImageSharp.fluid} />
          </Envelope>
        </Section>
      )}
    </VisibilityObserver>
  )
}

export default NewsletterSection
