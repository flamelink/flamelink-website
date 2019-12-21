import React from 'react'
import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import TestimonialsSlider from '../components/TestimonialsSlider'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'

function BusinessPage({ data }) {
  const pageContent = data.flamelinkBusinessPersonaPageContent

  const {
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection,
    testimonialsSection
  } = pageContent

  return (
    <Layout>
      <SEO
        keywords={['flamelink', 'business', 'enterprise']}
        title={pageTitle}
      />
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
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>{caseStudiesSection.title}</SectionTitle>
          </SectionContainer>
        </Section>

        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>{testimonialsSection.title}</SectionTitle>
            <TestimonialsSlider
              testimonials={get(testimonialsSection, 'testimonials', [])}
            />
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default BusinessPage

export const query = graphql`
  query BusinessPersonaPageQuery {
    flamelinkBusinessPersonaPageContent {
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
          excerpt
          logo {
            localFile {
              childImageSharp {
                fixed {
                  base64
                  tracedSVG
                  aspectRatio
                  width
                  height
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  originalName
                }
              }
            }
          }
        }
      }
      testimonialsSection {
        title
        testimonials {
          avatar {
            localFile {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          name
          jobTitle
          quote
        }
      }
    }
  }
`
