import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import get from 'lodash/get'
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import ExternalLink from '../components/ExternalLink'
import CheckMarkIcon from '../icons/CheckMark'

function PricingPage({ data }) {
  const {
    pageTitle,
    excerpt,
    plansSection,
    standardFeaturesSection,
    termsSection
  } = get(data, 'flamelinkPricingPageContent', {})

  return (
    <Layout>
      <SEO keywords={['flamelink', 'pricing']} title={pageTitle} />
      <main>
        <PageBanner title={pageTitle} />
        <Section className="bg-white">
          <SectionContainer
            as="aside"
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
    </Layout>
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
