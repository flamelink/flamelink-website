import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { useTransition, animated } from 'react-spring'
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
import ToggleButtons from '../components/ToggleButtons'
import Button from '../components/Button'
import CheckMarkIcon from '../icons/CheckMark'

type PricingPlan = {
  name: string
  tagline: string
  currency?: string
  priceMonthly?: string
  priceAnnually?: string
  ctaText?: string
  smallPrint?: string
  features: string[]
}

const PricingPlanCard = styled.li`
  ${tw`shadow py-10 px-8 md:mx-4 text-center border-2 flex-shrink-1`}

  width: 21.875rem;
  max-width: 100%;
  border-radius: 1px;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (min-width: ${props => props.theme.screens.md}) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

function PricingPage({ data }) {
  const {
    pageTitle,
    excerpt,
    plansSection,
    standardFeaturesSection,
    termsSection
  } = get(data, 'flamelinkPricingPageContent', {})

  const [selectedOption, setSelectedOption] = React.useState('Individuals')

  const transitions = useTransition(selectedOption, item => item, {
    from: {
      opacity: 0,
      position: 'absolute'
    },
    enter: {
      opacity: 1,
      position: 'static'
    },
    leave: {
      opacity: 0,
      position: 'absolute'
    }
  })

  const allPlans: PricingPlan[] = React.useMemo(() => {
    return get(plansSection, 'individualPlans', []).concat(
      get(plansSection, 'businessPlans', [])
    )
  }, [plansSection])

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
            <SectionTitle>{get(plansSection, 'title', '')}</SectionTitle>
            <ToggleButtons
              selected={selectedOption}
              options={['Individuals', 'Business']}
              onChange={setSelectedOption}
              className="mb-15"
            />
            <Box className="relative w-full">
              {transitions.map(({ item, props, key }) => (
                <Box
                  as={animated.ul}
                  key={key}
                  style={props}
                  className="flex flex-col md:flex-row flex-no-wrap md:justify-center items-center md:items-stretch w-auto md:w-full"
                >
                  {(item === 'Individuals'
                    ? get(plansSection, 'individualPlans', [])
                    : get(plansSection, 'businessPlans', [])
                  ).map((plan: PricingPlan) => (
                    <PricingPlanCard
                      key={plan.name}
                      css={
                        !plan.priceMonthly
                          ? css`
                              ${tw`border-brand`}
                            `
                          : css`
                              ${tw`border-transparent`}
                            `
                      }
                    >
                      <header
                        css={css`
                          min-height: 6.25rem;
                        `}
                      >
                        <h2 className="text-brand text-5xl leading-snug font-light">
                          {plan.name}
                        </h2>
                        <h3 className="text-base leading-snug">
                          {plan.tagline}
                        </h3>
                      </header>
                      <Box
                        className={`flex flex-row justify-center items-baseline text-heading font-light py-10 ${
                          !plan.priceMonthly ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <span
                          css={css`
                            font-size: 2.3125rem;
                            line-height: 1;
                          `}
                        >
                          {plan.currency}
                        </span>
                        <span
                          css={css`
                            font-size: 5rem;
                            line-height: 1;
                          `}
                        >
                          {plan.priceMonthly || '0'}
                        </span>
                      </Box>
                      <Box>
                        <Button
                          variant={plan.priceMonthly ? 'outlined' : 'contained'}
                          color="primary"
                          className={plan.smallPrint ? 'mb-3' : 'mb-12'}
                          as={ExternalLink}
                          href={
                            plan.priceMonthly
                              ? `https://app.flamelink.io/?utm_source=website&utm_medium=pricecard&utm_campaign=${plan.name}`
                              : 'mailto:solarflare@flamelink.io?subject=Solar%20Flare%20Enquiry'
                          }
                        >
                          {plan.ctaText}
                        </Button>
                      </Box>
                      {plan.smallPrint && (
                        <small className="leading-snug italic mb-4 inline-block">
                          {plan.smallPrint}
                        </small>
                      )}
                      <hr className="mb-9" />
                      <ul>
                        {(get(
                          plan,
                          'features',
                          []
                        ) as PricingPlan['features']).map(feature => (
                          <li
                            key={feature}
                            css={css`
                              line-height: 1.88;
                            `}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </PricingPlanCard>
                  ))}
                </Box>
              ))}
            </Box>
          </SectionContainer>
        </Section>
        <Section className="bg-white">
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
        individualPlans {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features
        }
        businessPlans {
          name
          tagline
          currency
          priceMonthly
          priceAnnually
          ctaText
          smallPrint
          features
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
