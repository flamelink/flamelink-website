import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import InterfacesSlider from '../components/InterfacesSlider'
import IconCopyBlocks from '../components/IconCopyBlocks'
import ContactUsSection from '../components/ContactUsSection'

const getBlockData = features => {
  return features.map(feature => ({
    title: feature.title,
    excerpt: feature.excerpt,
    iconUrl: get(feature, 'icon[0].url')
  }))
}

function FeaturesPage({ data }) {
  const pageData = get(data, 'flamelinkFeaturesPageContent', {})

  return (
    <Layout>
      <SEO keywords={['flamelink', 'features']} title="Features" />
      <main>
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
            />
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'userSection.title', '')}
            </SectionTitle>
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
            />
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </Layout>
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
