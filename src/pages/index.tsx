import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Group } from 'reakit/Group'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import PageContainer from '../components/PageContainer'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import InterfacesSlider, {
  InterfacesSliderProps,
  InterfaceSlide
} from '../components/InterfacesSlider'

function HomePage({ data }) {
  const pageData = get(data, 'allFlamelinkHomePageContent.edges[0].node')

  if (!pageData) {
    return <h2>Page data failed to load :(</h2>
  }

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

        {/* INTERFACE SECTION */}
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'interfaceSection.title', 'Content Interface')}
            </SectionTitle>
          </SectionContainer>
          <InterfacesSlider
            slides={
              get(pageData, 'interfaceSection.images', []).map(
                (image: unknown, idx: number) => ({
                  inputId: `s${idx + 1}`,
                  slideId: `slide${idx + 1}`,
                  image: get(
                    image,
                    'localFile.childImageSharp.fluid'
                  ) as InterfaceSlide
                })
              ) as InterfacesSliderProps['slides']
            }
          />
          <Button
            variant="contained"
            color="primary"
            as={ExternalLink}
            href={get(pageData, 'interfaceSection.cta.url', '#')}
          >
            {get(pageData, 'interfaceSection.cta.text', 'Get Started')}
          </Button>
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

export const query = graphql`
  query HomePageQuery {
    allFlamelinkHomePageContent {
      edges {
        node {
          banner {
            title1
            title2
            excerpt
            cta {
              text
              action
            }
            image {
              localFile {
                childImageSharp {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
          interfaceSection {
            title
            images {
              localFile {
                childImageSharp {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
            cta {
              url
              text
            }
          }
        }
      }
    }
  }
`
