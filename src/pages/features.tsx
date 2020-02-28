import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import InterfacesSlider from '../components/InterfacesSlider'
import IconCopyBlocks from '../components/IconCopyBlocks'
import ContactUsSection from '../components/ContactUsSection'
import { FeaturesPageQueryQuery } from '../../types/graphql-types'

const getBlockData = features => {
  return features.map(feature => ({
    title: feature.title,
    excerpt: feature.excerpt,
    iconUrl: get(feature, 'icon[0].url')
  }))
}

let featuresPageSubscription: any
let featuresSubscription: any

function FeaturesPage({ data }: { data: FeaturesPageQueryQuery }) {
  const [realtimeContent, setRealtimeContent] = React.useState()

  if (!featuresPageSubscription) {
    console.log('Subscription created for featuresPage')
    featuresPageSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'featuresPage',
      populate: true,
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the featuresPage content. Details:',
            error
          )
        }
        setRealtimeContent({ realtime: true, ...result })

      }
    })
  }

  if (!featuresSubscription) {
    console.log('Subscription created for features')
    featuresSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'features',
      callback: async (error: any, result: Object) => {
        if (error) {
          return console.error(
            'Something went wrong while retrieving features content. Details:',
            error
          )
        }
        try {
          const pageContent = await flamelinkApp.content.get({
            schemaKey: 'featuresPage',
            populate: true
          })
          setRealtimeContent({ realtime: true, ...pageContent })
        } catch (e) {
          return console.error(
            'Something went wrong while retrieving all the featuresPage content. Details:',
            error
          )
        }
      }
    })
  }

  const pageData =
    realtimeContent || get(data, 'flamelinkFeaturesPageContent', {})

  return (
    <>
      <SEO
        keywords={['flamelink', 'features']}
        title="Features"
        description="Flamelink saves you time and money with a secure and scalable flexible content and integrations interface."
        url="/features"
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title="Features" />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'businessSection.title', '')}
            </SectionTitle>
            <IconCopyBlocks
              blocks={getBlockData(
                get(pageData, 'businessSection.features', [])
              )}
              className="-mb-10"
            />
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'contentSection.title', '')}
            </SectionTitle>
            <IconCopyBlocks
              blocks={getBlockData(
                get(pageData, 'contentSection.features', [])
              )}
              className="-mb-10"
            />
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'userSection.title', '')}
            </SectionTitle>
            <ul className="flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-stretch">
              {get(pageData, 'userSection.features', []).map(
                (
                  {
                    title,
                    excerpt,
                    icon
                  }: { title: string; excerpt: string; icon: any },
                  index: number
                ) => (
                  <li
                    key={title}
                    className="bg-white shadow p-10 mb-8 lg:mb-0 mx-4 w-full sm:w-2/3 lg:w-1/2 rounded"
                    css={css`
                      max-width: 100%;

                      @media screen and (min-width: 1024px) {
                        max-width: 27.8125rem;
                      }

                      ${index + 1 === pageData.userSection.features.length &&
                        css`
                          margin-bottom: 0;
                        `}
                    `}
                  >
                    <header className="flex justify-start items-center mb-4">
                      {get(icon, '[0].url') ? (
                        <span className="w-8 h-8 mr-4">
                          <img
                            src={icon[0].url}
                            alt=""
                            loading="lazy"
                            width="32"
                            height="32"
                          />
                        </span>
                      ) : null}
                      <h3
                        className="text-xl text-heading font-medium"
                        style={{ margin: '0.625rem 0' }}
                      >
                        {title}
                      </h3>
                    </header>
                    {excerpt ? <p>{excerpt}</p> : null}
                  </li>
                )
              )}
            </ul>
          </SectionContainer>
        </Section>
        <InterfacesSlider />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'techSection.title', '')}
            </SectionTitle>
            <IconCopyBlocks
              blocks={getBlockData(get(pageData, 'techSection.features', []))}
              className="-mb-10"
            />
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </>
  )
}

export default FeaturesPage

export const query = graphql`
  query FeaturesPageQuery {
    flamelinkFeaturesPageContent {
      businessSection {
        title
        features {
          title
          excerpt
          icon {
            url
          }
        }
      }
      contentSection {
        title
        features {
          title
          excerpt
          icon {
            url
          }
        }
      }
      techSection {
        title
        features {
          title
          excerpt
          icon {
            url
          }
        }
      }
      userSection {
        title
        features {
          title
          excerpt
          icon {
            url
          }
        }
      }
    }
  }
`
