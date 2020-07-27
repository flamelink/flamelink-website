import React, { useEffect, useCallback } from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import get from 'lodash/get'
import SEO from '../components/SEO'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import PageBanner from '../components/PageBanner'
import { PageContent } from '../components/PageContent'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import InterfacesSlider from '../components/InterfacesSlider'
import IconCopyBlocks from '../components/IconCopyBlocks'

type PageContext = {
  isCreatedByStatefulCreatePages: boolean
  title: string
  description: string
  slug: string
  locale: string
  html: string
  backgroundImage?: any[]
  featuresSection: {
    title?: string
    show: boolean
  }
  cta: {
    link?: string
    text?: string
    show: boolean
  }
}

type PageProps = {
  pageContext: PageContext
}

const LandingPage: React.FC<PageProps> = ({ pageContext }) => {
  const isBookADemoPage = useCallback(
    () => get(pageContext, 'slug').startsWith('/book-a-demo'),
    [pageContext]
  )

  useEffect(() => {
    if (isBookADemoPage()) {
      const src = 'https://assets.calendly.com/assets/external/widget.js'
      const head = document.querySelector('head')
      const script = document.createElement('script')
      script.setAttribute('src', src)
      if (head) {
        head.appendChild(script)
      }
    }
  }, [isBookADemoPage, pageContext.slug])

  return (
    <>
      <SEO
        keywords={
          get(pageContext, 'seo.keywords') || ['flamelink', pageContext.title]
        }
        title={get(pageContext, 'seo.title') || get(pageContext, 'title', '')}
        description={get(pageContext, 'seo.description', '')}
        url={get(pageContext, 'slug', '')}
        image={get(
          pageContext,
          'backgroundImage[0].localFile.childImageSharp.fluid.src',
          ''
        )}
      />

      {get(
        pageContext,
        'backgroundImage[0].localFile.childImageSharp.fluid'
      ) ? (
        <BackgroundImage
          Tag="section"
          className="w-screen pt-48 pb-20"
          style={{ marginTop: '-7rem' }}
          fluid={pageContext.backgroundImage[0].localFile.childImageSharp.fluid}
        >
          <h1 className="text-white font-normal text-5xl uppercase text-center">
            {pageContext.title}
          </h1>
        </BackgroundImage>
      ) : (
        <PageBanner title={pageContext.title} />
      )}

      <Section className="bg-white">
        <SectionContainer>
          <PageContent
            className="w-full"
            as="article"
            dangerouslySetInnerHTML={{
              __html: pageContext.html
            }}
          />
        </SectionContainer>
      </Section>

      {isBookADemoPage() && <InterfacesSlider withoutCTA />}

      {get(pageContext, 'featuresSection.show', false) && (
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>Key Features</SectionTitle>
            <IconCopyBlocks
              blocks={get(pageContext, 'featuresSection.keyFeatures', []).map(
                (feature: { title: string; excerpt: string; icon?: [] }) => ({
                  title: feature.title,
                  excerpt: feature.excerpt,
                  iconUrl: get(feature, 'icon[0].url')
                })
              )}
              className="max-w-full"
              wider
            />
          </SectionContainer>
        </Section>
      )}

      {isBookADemoPage() && (
        <Section className="bg-gray-100">
          {/* <SectionTitle className="mb-0">Book a Demo</SectionTitle> */}
          <span className="font-light text-center text-heading text-2xl sm:text-4xl md:text-5xl">
            Book a Demo
          </span>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/flamelink/30min?primary_color=ff6633"
            style={{ minWidth: 320, width: '100%', height: 650 }}
          />
        </Section>
      )}

      {get(pageContext, 'cta.show', false) && (
        <div className="flex justify-center mb-20">
          <Button
            variant="contained"
            color="primary"
            as={pageContext?.cta?.link?.startsWith('/') ? Link : ExternalLink}
            href={get(pageContext, 'cta.link', '#')}
            className="mt-4"
          >
            {get(pageContext, 'cta.text', 'Get Started')}
          </Button>
        </div>
      )}
    </>
  )
}
export default LandingPage
