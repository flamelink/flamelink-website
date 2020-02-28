import React from 'react'
import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import {
  Section,
  SectionContainer
  // SectionTitle
} from '../components/Section'
// import TestimonialsSlider from '../components/TestimonialsSlider'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'
import { BusinessPersonaPageQueryQuery } from '../../types/graphql-types'

let businessPersonaPageSubscription: any
let caseStudiesSubscription: any

function BusinessPage({ data }: { data: BusinessPersonaPageQueryQuery }) {
  const [realtimeContent, setRealtimeContent] = React.useState()

  if (!businessPersonaPageSubscription) {
    console.log('Subscription created for businessPersonaPage')
    businessPersonaPageSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'businessPersonaPage',
      populate: true,
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the businessPersonaPage content. Details:',
            error
          )
        }
        setRealtimeContent({ realtime: true, ...result })
      }
    })
  }

  if (!caseStudiesSubscription) {
    console.log('Subscription created for caseStudies')
    caseStudiesSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'caseStudies',
      populdate: true,
      callback: async (error: any, result: Object) => {
        if (error) {
          return console.error(
            'Something went wrong while retrieving caseStudies content. Details:',
            error
          )
        }
        try {
          const pageContent = await flamelinkApp.content.get({
            schemaKey: 'businessPersonaPage',
            populate: true
          })
          setRealtimeContent({ realtime: true, ...pageContent })
        } catch (e) {
          return console.error(
            'Something went wrong while retrieving all the businessPersonaPage content. Details:',
            error
          )
        }
      }
    })
  }

  const pageData =
    realtimeContent || get(data, 'flamelinkBusinessPersonaPageContent', {})

  const {
    realtime,
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection
    // testimonialsSection
  } = pageData

  return (
    <>
      <SEO
        keywords={['flamelink', 'business', 'enterprise']}
        title={pageTitle}
        description={overviewSection.excerpt}
        url="/business"
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <ImageRevealSection
          realtime={realtime}
          bg="white"
          heading={overviewSection.title}
          content={overviewSection.excerpt}
          imagePosition={overviewSection.imagePosition}
          imageYOverlap={overviewSection.imageYOverlap}
          imageSrc={get(overviewSection, 'image[0].url')}
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
          realtime={realtime}
          title={caseStudiesSection.title}
          caseStudies={caseStudiesSection.caseStudies}
        />

        {/* <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>{testimonialsSection.title}</SectionTitle>
            <TestimonialsSlider
              testimonials={get(testimonialsSection, 'testimonials', [])}
            />
          </SectionContainer>
        </Section> */}
        <ContactUsSection />
      </main>
    </>
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
              fluid(maxWidth: 900, quality: 80) {
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
          excerpt
          brandColour
          logo {
            localFile {
              childImageSharp {
                fluid(maxWidth: 460) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          backgroundImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          mainImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      # testimonialsSection {
      #   title
      #   testimonials {
      #     avatar {
      #       localFile {
      #         childImageSharp {
      #           fluid(maxWidth: 120) {
      #             ...GatsbyImageSharpFluid_withWebp
      #           }
      #         }
      #       }
      #     }
      #     name
      #     jobTitle
      #     quote
      #   }
      # }
    }
  }
`
