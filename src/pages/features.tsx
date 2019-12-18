import React from 'react'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import InterfacesSlider, {
  InterfacesSliderProps,
  InterfaceSlide
} from '../components/InterfacesSlider'
import IconCopyBlocks from '../components/IconCopyBlocks'
import ContactUsSection from '../components/ContactUsSection'

function FeaturesPage() {
  // TODO: setup query for page data
  const pageData = {}
  return (
    <Layout>
      <SEO keywords={['flamelink', 'features']} title="Features" />
      <main>
        <PageBanner title="Features" />
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Saves you Time and Money</SectionTitle>
            <IconCopyBlocks blocks={[]} />
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>Flexible Content and Integrations</SectionTitle>
            <IconCopyBlocks blocks={[]} />
          </SectionContainer>
        </Section>
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Improved User Management</SectionTitle>
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'interfaceSection.title', 'Content Interfaces')}
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
            <SectionTitle>Secure and Scalable</SectionTitle>
            <IconCopyBlocks blocks={[]} />
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default FeaturesPage
