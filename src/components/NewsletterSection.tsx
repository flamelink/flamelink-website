import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { IoIosCheckmarkCircleOutline as SuccessIcon } from 'react-icons/io'
import { Box } from 'reakit/Box'
import {
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'
import { Section, SectionContainer, SectionTitle } from './Section'
import VisibilityObserver, {
  VisibilityObserverPayload
} from './VisibilityObserver'
import ArrowRight from '../icons/ArrowRight'
import { useNewsletterForm } from '../hooks/newsletter-form'

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

  const form = useNewsletterForm()

  return (
    <VisibilityObserver threshold={0.45} once className="relative">
      {({ isIntersecting }: VisibilityObserverPayload) => (
        <>
          <Section
            className="bg-gray-100"
            css={css`
              ${tw`relative overflow-visible sm:pt-23 sm:pb-25`}
            `}
          >
            <Box
              css={css`
                ${tw`z-10 max-w-2xl w-full`}
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
                <Form {...form} className="w-full mb-10">
                  <FormLabel
                    {...form}
                    name="email"
                    className="relative block mx-auto w-full"
                  >
                    <FormInput
                      {...form}
                      name="email"
                      type="email"
                      placeholder={get(data, 'placeholderText', '')}
                      aria-label="email address for newsletter"
                      className="py-4 px-5 sm:py-5 sm:px-8 w-full text-3xl sm:text-4xl placeholder-gray-400 border border-gray-100 focus:border-brand outline-none"
                      css={css`
                        & ~ button:focus {
                          outline: 0;
                        }
                      `}
                    />
                    <FormSubmitButton
                      {...form}
                      className="absolute inset-y-0 right-0 top-0 mr-5 opacity-50 hover:opacity-100 outline-none focus:opacity-100 focus:text-brand-dark"
                    >
                      <ArrowRight
                        css={css`
                          height: 1.125rem;
                        `}
                      />
                    </FormSubmitButton>
                  </FormLabel>
                  <FormMessage
                    {...form}
                    name="email"
                    className="text-red-600 text-xs mt-2 absolute"
                  />
                </Form>
                {form.submitSucceed ? (
                  <p className="text-center leading-normal flex justify-start items-center">
                    <SuccessIcon className="mr-2 text-green-600 text-lg" />{' '}
                    Thanks for signing up to our newsletter!
                  </p>
                ) : (
                  <p className="text-center leading-normal">
                    {get(data, 'excerpt', '')}
                  </p>
                )}
              </SectionContainer>
            </Box>
          </Section>
          <Envelope
            css={props => css`
              width: 0%;
              transition: ${isIntersecting
                ? 'all 350ms ease-out'
                : 'all 190ms ease-in'};
              transform: ${isIntersecting ||
              get(props, 'device.prefersReducedMotion', false)
                ? 'translateX(0%)'
                : 'translateX(100%)'};

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
        </>
      )}
    </VisibilityObserver>
  )
}

export default NewsletterSection
