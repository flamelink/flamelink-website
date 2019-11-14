import React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import { Section, SectionContainer, SectionTitle } from '../components/section'

function PricingPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'pricing']} title="Pricing" />
      <PageHeader title="Pricing" />
      <Section className="bg-white">
        <SectionContainer
          as="aside"
          css={css`
            ${tw`leading-normal text-center max-w-3xl`}
          `}
        >
          This is usually the awkward part at the end of a first date. The to
          and fro over who’ll cover the bill. But this is not a first date, and
          we’re pretty classy like that. So you can get started for free. Try it
          out, see how it works for you. And if you need more users, extra
          features and other cool stuff - we’ve got the perfect price to fit
          your project, and your pocket.
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
      <Section className="bg-brand-primary text-white">
        <SectionContainer>
          Please Note Storage, API Requests & SLA are determined by your
          Firebase plan. Remember, You need a Firebase* project to hook
          Flamelink up to. For more on Firebase pricing check out:
          https://firebase.google.com/pricing *Firebase plan limitations apply
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default PricingPage
