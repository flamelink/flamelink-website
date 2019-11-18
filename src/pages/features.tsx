import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import { Section, SectionContainer, SectionTitle } from '../components/Section'

function FeaturesPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'features']} title="Features" />
      <main>
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
      </main>
    </Layout>
  )
}

export default FeaturesPage
