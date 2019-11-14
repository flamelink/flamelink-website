import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import { Section, SectionContainer, SectionTitle } from '../components/section'

function FeaturesPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'features']} title="Features" />
      <PageHeader title="Features" />
      <Section className="bg-white">
        <SectionContainer>
          <SectionTitle>Harness the Power of Flamelink!</SectionTitle>
        </SectionContainer>
      </Section>
      <Section className="bg-gray-100">
        <SectionContainer>
          <SectionTitle>More Features</SectionTitle>
        </SectionContainer>
      </Section>
      <Section className="bg-white">
        <SectionContainer>
          <SectionTitle>Coming Up</SectionTitle>
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default FeaturesPage
