import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { Box } from 'reakit/Box'
import get from 'lodash/get'
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai'
import { JsonLd } from 'react-schemaorg'
import { WebApplication } from 'schema-dts'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { PageContent } from '../components/PageContent'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import ExternalLink from '../components/ExternalLink'
import Button from '../components/Button'
import SolarFlareTypeForm from '../components/SolarFlareTypeForm'
import LargePricingCard from '../components/LargePricingCard'
import PlanFeaturesList from '../components/PlanFeaturesList'
import CheckMarkIcon from '../icons/CheckMark'
import { PricingPageQueryQuery } from '../../types/graphql-types'
import { PricingPlan } from '../../types/pricing'

const PricingPlanCard = styled.li`
  ${tw`relative shadow pt-8 md:pt-10 pb-10 md:pb-15 px-5 md:mx-2 text-center flex flex-col`}

  border-radius: 1px;
  border-width: 3px;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (min-width: ${props => props.theme.screens.md}) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

const Ribbon = styled.span`
  ${tw`bg-brand text-brand`}

  position: absolute;
  top: 0;
  left: 1.5rem;
  width: 1.625rem;
  height: 2.25rem;

  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: -0.5rem;
    border-left: 0.8125rem solid currentColor;
    border-right: 0.8125rem solid currentColor;
    border-bottom: 0.5rem solid transparent;
  }
`

function PricingPage({ data }: { data: PricingPageQueryQuery }) {
  const {
    pageTitle,
    excerpt,
    plansSection,
    standardFeaturesSection,
    termsSection
  } = get(data, 'flamelinkPricingPageContent', {})

  const allPlans: PricingPlan[] = React.useMemo(() => {
    return get(plansSection, 'plans', []).concat([
      get(plansSection, 'enterprisePlan'),
      get(plansSection, 'freePlan')
    ])
  }, [plansSection])

  const scrollToStandardFeatures = React.useCallback(e => {
    e.preventDefault()

    const standardFeaturesSection = document.getElementById('standard-features')

    if (standardFeaturesSection) {
      standardFeaturesSection.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <>
      <JsonLd<WebApplication>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': 'flamelink',
          applicationCategory: 'Content Management System',
          name: 'Flamelink - A Firebase CMS',
          operatingSystem: 'all',
          browserRequirements: 'Requires JavaScript and HTML5 support',
          url: 'https://app.flamelink.io',
          offers: [
            {
              '@type': 'Offer',
              offeredBy: {
                '@type': 'Organization',
                name: 'Flamelink'
              },
              availability: 'http://schema.org/InStock',
              category: 'SaaS',
              priceCurrency: 'USD',
              priceSpecification: allPlans.map(plan => ({
                '@type': 'UnitPriceSpecification',
                price: get(plan, 'priceMonthly', ''),
                priceCurrency: 'USD',
                name: get(plan, 'name', ''),
                referenceQuantity: {
                  '@type': 'QuantitativeValue',
                  value: '1',
                  unitCode: 'MON'
                }
              }))
            }
          ],
          creator: {
            '@type': 'Organization',
            '@id': '#organization',
            url: 'https://flamelink.io',
            email: 'info@flamelink.io',
            name: 'Flamelink',
            slogan: 'A Firebase CMS',
            logo: {
              '@type': 'ImageObject',
              url: 'https://flamelink.io/flamelink-logo-darkgrey-tag.png',
              width: '1200px',
              height: '312px'
            }
          }
        }}
      />
      <SEO
        keywords={[
          'flamelink',
          'pricing',
          'saas',
          'firebase',
          'cms',
          'content management system'
        ]}
        title={pageTitle}
        description={excerpt}
        url="/pricing"
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <Section className="bg-white">
          <SectionContainer
            css={css`
              ${tw`leading-normal text-body font-normal text-center`}
            `}
          >
            <Box className="max-w-3xl">{excerpt}</Box>
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle
              css={css`
                margin-bottom: 1.25rem;
              `}
            >
              {get(plansSection, 'title', '')}
            </SectionTitle>
            <Box
              className="max-w-2xl text-gray-700 text-center mb-4 md:mb-10"
              css={css`
                p {
                  ${tw`mb-5`}
                }
                p em {
                  ${tw`text-brand not-italic`}
                }
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  plansSection,
                  'excerpt.childMarkdownRemark.html',
                  ''
                )
              }}
            />
          </SectionContainer>
          <SectionContainer
            css={css`
              ${tw`max-w-7xl`}
            `}
          >
            <Box className="relative w-full mb-10">
              <Box as="ul" className="grid grid-cols-1 md:grid-cols-4">
                {get(plansSection, 'plans', []).map((plan: PricingPlan) => (
                  <PricingPlanCard
                    key={plan.name}
                    css={
                      plan.name === get(plansSection, 'recommendedPlan.name')
                        ? css`
                            ${tw`border-brand`}
                          `
                        : css`
                            ${tw`border-transparent`}
                          `
                    }
                  >
                    <header
                      className="flex-grow-0"
                      css={css`
                        min-height: 6.25rem;
                      `}
                    >
                      {plan.name ===
                        get(plansSection, 'recommendedPlan.name') && (
                        <>
                          <Ribbon />
                          <small
                            className="text-brand absolute text-xs md:text-sm italic"
                            css={css`
                              top: 0.5rem;
                              right: 1rem;
                            `}
                          >
                            {get(plansSection, 'recommendPlanText', '')}
                          </small>
                        </>
                      )}

                      <h2 className="text-brand text-5xl leading-snug font-normal mb-2">
                        {plan.name}
                      </h2>
                      <h3
                        className="text-gray-700 text-base font-light leading-snug"
                        css={props => css`
                          @media screen and (min-width: ${props.screens.md}) {
                            min-height: calc(
                              1em * 1.375 * 4
                            ); /* at least 4 rows */
                          }
                        `}
                      >
                        {plan.tagline}
                      </h3>
                    </header>
                    <Box
                      className={`flex flex-row justify-center items-baseline font-light py-5 flex-grow-0 ${
                        !plan.priceMonthly ? 'opacity-0' : 'opacity-100'
                      } ${
                        plan.name === get(plansSection, 'recommendedPlan.name')
                          ? 'text-brand'
                          : 'text-heading'
                      }`}
                    >
                      <span
                        css={css`
                          position: relative;
                          font-size: 5rem;
                          line-height: 0.7;
                        `}
                      >
                        <sup
                          css={css`
                            font-size: 1.8125rem;
                            line-height: 1;
                            position: absolute;
                            top: 0;
                            left: -1ch;
                          `}
                        >
                          {plan.currency}
                        </sup>
                        {plan.priceMonthly || '0'}
                        <sub
                          className="text-sm leading-none absolute"
                          css={css`
                            bottom: -0.25rem;
                            right: -3ch;
                          `}
                        >
                          /mo
                        </sub>
                      </span>
                    </Box>
                    {plan.smallPrint && (
                      <small className="leading-snug mb-5 inline-block flex-grow-0 font-normal text-gray-550">
                        {plan.smallPrint}
                      </small>
                    )}
                    <PlanFeaturesList
                      features={get(plan, 'features', [])}
                      className="mb-3 flex-grow-0 text-heading"
                      caged
                    />
                    <Box className="w-full flex flex-col justify-between items-center flex-grow">
                      <button
                        className="text-brand hover:underline mb-5 text-sm leading-snug"
                        onClick={scrollToStandardFeatures}
                      >
                        Standard features included
                      </button>
                      <Button
                        variant="outlined"
                        color="primary"
                        as={ExternalLink}
                        href={`https://app.flamelink.io/?utm_source=website&utm_medium=pricecard&utm_campaign=${plan.name}`}
                      >
                        {plan.ctaText}
                      </Button>
                    </Box>
                  </PricingPlanCard>
                ))}
              </Box>
            </Box>
            {get(plansSection, 'enterprisePlan') && (
              <Box className="w-full mb-10 px-2">
                <LargePricingCard
                  type="primary"
                  plan={get(plansSection, 'enterprisePlan')}
                  cta={
                    <SolarFlareTypeForm
                      disclosure={
                        <Button variant="contained" color="secondary">
                          {plansSection.enterprisePlan.ctaText}
                        </Button>
                      }
                    />
                  }
                />
              </Box>
            )}
            {get(plansSection, 'freePlan') && (
              <Box className="w-full px-2">
                <LargePricingCard
                  plan={get(plansSection, 'freePlan')}
                  cta={
                    <Button
                      variant="outlined"
                      color="primary"
                      as={ExternalLink}
                      href={`https://app.flamelink.io/?utm_source=website&utm_medium=pricecard&utm_campaign=${plansSection.freePlan.name}`}
                    >
                      {plansSection.freePlan.ctaText}
                    </Button>
                  }
                />
              </Box>
            )}
            <Box className="w-full"></Box>
          </SectionContainer>
        </Section>
        <Section className="bg-white" id="standard-features">
          <SectionContainer>
            <SectionTitle>
              {get(standardFeaturesSection, 'title', '')}
            </SectionTitle>
            <ul className="flex flex-col justify-star items-stretch">
              {get(standardFeaturesSection, 'features', []).map(
                (feature: string) => (
                  <li
                    key={feature}
                    className="flex flex-row justify-between items-center"
                  >
                    <span className="text-base text-body font-normal leading-loose">
                      {feature}
                    </span>
                    <CheckMarkIcon className="text-brand ml-8" />
                  </li>
                )
              )}
            </ul>
          </SectionContainer>
        </Section>
        <Section className="bg-brand text-white" pattern>
          <SectionContainer className="text-base text-center font-normal">
            <header className="flex justify-start items-center mb-5">
              <WarningIcon className="text-5xl mr-3" />
              <span className="text-xl font-medium uppercase">
                {get(termsSection, 'title', '')}
              </span>
            </header>
            <PageContent
              css={css`
                p a {
                  ${tw`font-medium block mb-4 hover:underline hover:text-white hover:opacity-75`}
                }
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  termsSection,
                  'content.childMarkdownRemark.html',
                  ''
                )
              }}
            />
          </SectionContainer>
        </Section>
      </main>
    </>
  )
}

export default PricingPage

export const query = graphql`
  query PricingPageQuery {
    flamelinkPricingPageContent {
      pageTitle
      excerpt
      plansSection {
        title
        excerpt {
          childMarkdownRemark {
            html
          }
        }
        plans {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features {
            key
            value
            link
          }
        }
        recommendedPlan {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features {
            key
            value
            link
          }
        }
        recommendPlanText
        enterprisePlan {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features {
            key
            value
            link
          }
        }
        freePlan {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features {
            key
            value
            link
          }
        }
      }
      standardFeaturesSection {
        title
        features
      }
      termsSection {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
