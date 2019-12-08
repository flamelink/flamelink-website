import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'

function BusinessPage() {
  return (
    <Layout>
      <SEO
        keywords={['flamelink', 'business', 'enterprise']}
        title="Business"
      />
      <main>
        <PageBanner title="Business" />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Quick and Secure</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer></SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Case Studies</SectionTitle>
          </SectionContainer>
        </Section>
      </main>
    </Layout>
  )
}

export default BusinessPage
