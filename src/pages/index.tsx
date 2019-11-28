import React from 'react'
import { Group } from 'reakit/Group'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import PageContainer from '../components/PageContainer'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'

function HomePage() {
  return (
    <Layout>
      <SEO
        keywords={[
          'flamelink',
          'cms',
          'firebase',
          'realtime',
          'database',
          'firestore',
          'google cloud platform',
          'content management',
          'headless'
        ]}
        title="Home"
      />
      <main>
        <PageBanner>
          <PageContainer>
            <h1 className="flex flex-col justify-start items-start text-white font-normal leading-none text-5xl mb-8">
              <span>Your workflow</span>
              <span className="text-6xl uppercase">made easy!</span>
            </h1>
            <p className="text-white mb-8 max-w-md">
              Flamelink plugs straight into Firebase, putting you in charge of
              your content and saving you time.
            </p>
            <Group>
              <Button variant="outlined" color="secondary">
                Demo Video
              </Button>
            </Group>
          </PageContainer>
        </PageBanner>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              Built for Firebase and the Google Cloud Platform
            </SectionTitle>
            <p>
              Firebase and the Google Cloud Platform are great for developers,
              but don't offer a great experience for non-developers managing
              content. With Flamelink, we've given the Firebase & GCP community
              a tool that's easy to set up and integrate, giving content editors
              and clients the ability to manage content from day one.
            </p>
            <p>
              All the power of Firebase and GCP. None of the content headaches.
            </p>
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              The easy-to-use, Intuitive, Content Interface for Firebase.
            </SectionTitle>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>How Does Flamelink Work?</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-green-400">
          <SectionContainer>
            <SectionTitle
              css={css`
                ${tw`text-white`}
              `}
            >
              Featured Case Studies
            </SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Key Features</SectionTitle>
            <Button variant="contained" color="primary">
              Learn More
            </Button>
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>What our clients say</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>...affiliates here...</SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle className="text-brand">
              Sign Up for Our Newsletter
            </SectionTitle>
            <p>
              Sign up to our newsletter and always stay in touch with the
              hottest news.
            </p>
          </SectionContainer>
        </Section>
      </main>
    </Layout>
  )
}

export default HomePage
