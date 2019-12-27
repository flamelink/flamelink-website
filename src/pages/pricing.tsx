import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { Box } from 'reakit/Box'
import get from 'lodash/get'
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import ExternalLink from '../components/ExternalLink'
import ToggleButtons from '../components/ToggleButtons'
import Button from '../components/Button'
import CheckMarkIcon from '../icons/CheckMark'

const PricingPlanCard = styled.li`
  ${tw`shadow py-10 px-8 mx-4 text-center`}

  width: 21.875rem;
  max-width: 100%;
`

function PricingPage({ data }) {
  const {
    pageTitle,
    excerpt,
    plansSection,
    standardFeaturesSection,
    termsSection
  } = get(data, 'flamelinkPricingPageContent', {})
  const [selectedOption, setSelectedOption] = React.useState('Individual')
  const plans = React.useMemo(() => {
    const pricingPlans = []

    get(plansSection, 'individualPlans', []).forEach(plan =>
      pricingPlans.push({ ...plan, type: 'Individual' })
    )

    get(plansSection, 'businessPlans', []).forEach(plan =>
      pricingPlans.push({ ...plan, type: 'Business' })
    )

    return pricingPlans
  }, [plansSection])

  return (
    <>
      <SEO keywords={['flamelink', 'pricing']} title={pageTitle} />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <Section className="bg-white">
          <SectionContainer
            css={css`
              ${tw`leading-normal text-body font-normal text-center max-w-3xl`}
            `}
          >
            {excerpt}
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>{get(plansSection, 'title', '')}</SectionTitle>
            <ToggleButtons
              selected={selectedOption}
              options={['Individual', 'Business']}
              onChange={setSelectedOption}
              className="mb-15"
            />
            <Box as="ul" className="flex flex-row justify-center items-stretch">
              {plans.map(plan => (
                <PricingPlanCard
                  key={plan.name}
                  css={css`
                    ${plan.type === selectedOption
                      ? 'display: block;'
                      : 'display: none;'}
                  `}
                >
                  <header>
                    <h2 className="text-brand text-5xl leading-snug font-light">
                      {plan.name}
                    </h2>
                    <h3 className="text-base leading-snug">{plan.tagline}</h3>
                  </header>
                  <Box>
                    {plan.currency}
                    {plan.priceMonthly}
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={plan.smallPrint ? 'mb-3' : 'mb-12'}
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
                    {get(plan, 'features', []).map(feature => (
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
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(standardFeaturesSection, 'title', '')}
            </SectionTitle>
            <ul className="flex flex-col justify-star items-stretch">
              {get(standardFeaturesSection, 'features', []).map(feature => (
                <li
                  key={feature}
                  className="flex flex-row justify-between items-center"
                >
                  <span className="text-base text-body font-normal leading-loose">
                    {feature}
                  </span>
                  <CheckMarkIcon className="text-brand ml-8" />
                </li>
              ))}
            </ul>
          </SectionContainer>
        </Section>
        <Section className="bg-brand text-white" pattern>
          <SectionContainer className="text-base text-center font-normal">
            <header className="flex justify-start items-center mb-5">
              <WarningIcon />
              <span className="text-xl font-medium uppercase">
                {get(termsSection, 'title', '')}
              </span>
            </header>
            <span className="mb-4">
              Storage, API Requests &amp; SLA are determined by your{' '}
              <strong>Firebase</strong> plan.
            </span>
            <span>
              Remember, you need a Firebase* project to hook Flamelink up to.
              For more on Firebase pricing check out:
            </span>
            <ExternalLink
              className="font-medium mb-4 hover:underline"
              href="https://firebase.google.com/pricing"
            >
              https://firebase.google.com/pricing
            </ExternalLink>
            <span>*Firebase plan limitations apply</span>
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
        content
      }
    }
  }
`
