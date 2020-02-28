import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import ExternalLink from '../components/ExternalLink'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer } from '../components/Section'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'
import { TechPersonaPageQueryQuery } from '../../types/graphql-types'

let techPersonaPageSubscription: any
let caseStudiesSubscription: any

function TechPage({ data }: { data: TechPersonaPageQueryQuery }) {
  const [realtimeContent, setRealtimeContent] = React.useState()

  if (!techPersonaPageSubscription) {
    console.log('Subscription created for techPersonaPage')
    techPersonaPageSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'techPersonaPage',
      populate: true,
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the techPersonaPage content. Details:',
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
            schemaKey: 'techPersonaPage',
            populate: true
          })
          setRealtimeContent({ realtime: true, ...pageContent })
        } catch (e) {
          return console.error(
            'Something went wrong while retrieving all the techPersonaPage content. Details:',
            error
          )
        }
      }
    })
  }

  const pageData =
    realtimeContent || get(data, 'flamelinkTechPersonaPageContent', {})

  const {
    realtime,
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection,
    packagesSection
  } = pageData

  return (
    <>
      <SEO
        keywords={[
          'flamelink',
          'coding',
          'technology',
          'javascript',
          'serverless',
          'cloud',
          'firebase'
        ]}
        title={pageTitle}
        description={overviewSection.excerpt}
        url="/tech"
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
        <Section className="bg-gray-100">
          <SectionContainer
            css={css`
              ${tw`block w-full`}
            `}
          >
            <ul className="flex justify-between items-stretch flex-no-wrap">
              {get(packagesSection, 'packages', []).map(pkg => (
                <li
                  key={pkg.name}
                  css={css`
                    max-width: 15.375rem;
                    width: 100%;
                    height: auto;
                    flex-shrink: 1;
                    flex-grow: 0;
                    transition: all 250ms ease;
                    margin: 0 1rem;

                    :hover {
                      transform: scale(1.1);
                    }
                  `}
                >
                  {get(
                    pkg,
                    'logo[0].localFile.childImageSharp.fluid',
                    get(pkg, 'logo[0].url')
                  ) &&
                    (pkg.link ? (
                      <ExternalLink href={pkg.link}>
                        {realtime ? (
                          <img src={pkg.logo[0].url} alt={pkg.name} />
                        ) : (
                          <Img
                            fluid={pkg.logo[0].localFile.childImageSharp.fluid}
                            title={pkg.name}
                          />
                        )}
                      </ExternalLink>
                    ) : (
                      <>
                        {realtime ? (
                          <img src={pkg.logo[0].url} alt={pkg.name} />
                        ) : (
                          <Img
                            fluid={pkg.logo[0].localFile.childImageSharp.fluid}
                            title={pkg.name}
                          />
                        )}
                      </>
                    ))}
                </li>
              ))}
            </ul>
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </>
  )
}

export default TechPage

export const query = graphql`
  query TechPersonaPageQuery {
    flamelinkTechPersonaPageContent {
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
      packagesSection {
        packages {
          name
          link
          logo {
            localFile {
              childImageSharp {
                fluid(maxWidth: 460) {
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
