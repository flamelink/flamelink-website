import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import ContactUsSection from '../components/ContactUsSection'

function ContentPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'content']} title="Content" />
      <main>
        <PageBanner title="Content" />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Content made Easy</SectionTitle>
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
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default ContentPage
