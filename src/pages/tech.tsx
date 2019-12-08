import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'

function TechPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'tech']} title="Tech" />
      <main>
        <PageBanner title="Tech" />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Tech Stack</SectionTitle>
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

export default TechPage
