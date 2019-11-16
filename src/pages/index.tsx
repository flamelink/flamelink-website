import React from 'react'
import { Group } from 'reakit/Group'
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
          <h1 className="flex flex-col justify-start items-start text-white font-light leading-none text-5xl uppercase mb-8">
            <span>What is</span>
            <span className="text-6xl">Flamelink</span>
          </h1>
          <p className="text-white mb-8 max-w-md">
            <em className="font-medium italic">Content is (still) King.</em>{' '}
            Flamelink is the only content interface that seamlessly integrates
            with Google's Firebase to offer you a fast, secure, scalable
            enterprise-ready solution for the future of content at your
            fingertips.
          </p>
          <Group>
            <Button
              variant="contained"
              color="secondary"
              className="mr-6 xs:mb-4 md:mb-0"
            >
              Get Started
            </Button>
            <Button variant="outlined" color="secondary">
              Demo Video
            </Button>
          </Group>
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
          <SectionTitle>Built With Flamelink</SectionTitle>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </SectionContainer>
      </Section>
      <Section className="bg-gray-100">
        <SectionContainer>
          <SectionTitle>Key Features</SectionTitle>
          <Button variant="contained" color="primary">
            More On Features
          </Button>
        </SectionContainer>
      </Section>
      <Section className="bg-green-400">
        <SectionContainer>
          <SectionTitle className="text-white">
            Featured Case Studies
          </SectionTitle>
        </SectionContainer>
      </Section>
      <Section className="bg-gray-100">
        <SectionContainer>
          <SectionTitle className="text-brand">
            Sign Up for Our Newsletter
          </SectionTitle>
          <p>
            Sign up to our newsletter and always stay in touch with the hottest
            news.
          </p>
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default HomePage
