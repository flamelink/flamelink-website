import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import PageContainer from '../components/page-container'
import { Section, SectionContainer, SectionTitle } from '../components/section'
import Button from '../components/button'

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
            <span>What is</span>
            <span className="text-6xl">Flamelink</span>
          </h1>
          <p className="text-white">
            <em>Content is (still) King.</em> Flamelink is the only content
            interface that seamlessly integrates with Google's Firebase to offer
            you a fast, secure, scalable enterprise-ready solution for the
            future of content at your fingertips.
          </p>
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
          <Button variant="outlined" color="secondary">
            Demo Video
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
          <p>
            Refined content infrastructure for effortless content management in
            your next Firebase project. Whatever that might be.
          </p>
        </SectionContainer>
      </Section>
      <Section className="bg-white">
        <SectionContainer>
          <SectionTitle>Built With Flamelink?</SectionTitle>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default HomePage
