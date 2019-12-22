import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer } from '../components/Section'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'

function ContentPage({ data }) {
  const {
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection
  } = get(data, 'flamelinkContentPersonaPageContent', {})

  return (
    <Layout>
      <SEO keywords={['flamelink', 'content']} title={pageTitle} />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <ImageRevealSection
          bg="white"
          heading={overviewSection.title}
          content={overviewSection.excerpt}
          imagePosition={overviewSection.imagePosition}
          imageYOverlap={overviewSection.imageYOverlap}
          fluidImage={get(overviewSection, 'image[0].localFile')}
        />
        <Section className="bg-gray-100">
          <SectionContainer>
            <p className="text-center max-w-4xl mb-15">
              {featuresSection.excerpt}
            </p>
            <IconCopyBlocks
              className="-mb-10"
              blocks={get(featuresSection, 'features', []).map(feature => ({
                title: feature.title,
                iconUrl: feature.icon[0].url
              }))}
            />
          </SectionContainer>
        </Section>
        <CaseStudiesRevealSection
          title={caseStudiesSection.title}
          caseStudies={caseStudiesSection.caseStudies}
        />
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default ContentPage

export const query = graphql`
  query ContentPersonaPageQuery {
    flamelinkContentPersonaPageContent {
      pageTitle
      overviewSection {
        imageYOverlap
        imagePosition
        excerpt
        title
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      featuresSection {
        excerpt
        features {
          title
          icon {
            url
          }
        }
      }
      caseStudiesSection {
        title
        caseStudies {
          title
          slug
          backgroundImage {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          excerpt
          logo {
            localFile {
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
