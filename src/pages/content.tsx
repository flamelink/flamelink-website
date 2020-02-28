import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer } from '../components/Section'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'
import { ContentPersonaPageQueryQuery } from '../../types/graphql-types'

let contentPersonaPageSubscription: any
let caseStudiesSubscription: any

function ContentPage({ data }: { data: ContentPersonaPageQueryQuery }) {
  const [realtimeContent, setRealtimeContent] = React.useState()

  if (!contentPersonaPageSubscription) {
    console.log('Subscription created for contentPersonaPage')
    contentPersonaPageSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'contentPersonaPage',
      populate: true,
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the contentPersonaPage content. Details:',
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
            schemaKey: 'contentPersonaPage',
            populate: true
          })
          setRealtimeContent({ realtime: true, ...pageContent })
        } catch (e) {
          return console.error(
            'Something went wrong while retrieving all the contentPersonaPage content. Details:',
            error
          )
        }
      }
    })
  }

  const pageData =
    realtimeContent || get(data, 'flamelinkContentPersonaPageContent', {})

  const {
    realtime,
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection
  } = pageData

  return (
    <>
      <SEO
        keywords={['flamelink', 'content', 'cms', 'content management']}
        title={pageTitle}
        description={overviewSection.excerpt}
        url="/content"
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
        <ContactUsSection />
      </main>
    </>
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
    }
  }
`
