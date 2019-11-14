import React from 'react'
import { Button } from 'reakit/Button'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import PageContainer from '../components/page-container'
import { Section, SectionContainer, SectionTitle } from '../components/section'

function HomePage() {
  return (
    <Layout>
      <SEO
        keywords={['gatsby', 'tailwind', 'react', 'tailwindcss']}
        title="Home"
      />

      <PageHeader>
        <PageContainer>
          <h1 className="text-white font-light text-5xl uppercase">
            <span>A CMS for</span>
            <span className="text-6xl">Firebase</span>
          </h1>
          <Button className="border-white border-2 text-white py-6 px-8">
            Learn More
          </Button>
        </PageContainer>
      </PageHeader>
      <Section className="bg-white">
        <SectionContainer>
          <SectionTitle>How Does Flamelink Work?</SectionTitle>
        </SectionContainer>
      </Section>
      <Section className="bg-gray-100">
        <SectionContainer>
          <SectionTitle>Where Can I Use Flamelink?</SectionTitle>
        </SectionContainer>
      </Section>
      <Section className="bg-white">
        <SectionContainer>
          <SectionTitle>Built With Flamelink?</SectionTitle>
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default HomePage
