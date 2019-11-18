import React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import ExternalLink from '../components/ExternalLink'

function PricingPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'pricing']} title="Pricing" />
      <main>
        <PageHeader title="Pricing" />
        <Section className="bg-white">
          <SectionContainer
            as="aside"
            css={css`
              ${tw`leading-normal text-center max-w-3xl`}
            `}
          >
            This is usually the awkward part at the end of a first date. The to
            and fro over who'll cover the bill. But this is not a first date,
            and we're pretty classy like that. So you can get started for free.
            Try it out, see how it works for you. And if you need more users,
            extra features and other cool stuff - we’ve got the perfect price to
            fit your project, and your pocket.
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>We Have the Right Package for You</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>All Packages Include These Features</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-brand text-white">
          <SectionContainer className="text-base text-center font-light">
            <span className="text-xl font-medium uppercase mb-5">
              Please Note
            </span>
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
