import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import get from 'lodash/get'
import SEO from '../components/SEO'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import PageBanner from '../components/PageBanner'
import { PageContent } from '../components/PageContent'
import { Section, SectionContainer } from '../components/Section'

type PageContext = {
  isCreatedByStatefulCreatePages: boolean
  title: string
  description: string
  slug: string
  locale: string
  html: string
  backgroundImage?: any[]
}

type PageProps = {
  pageContext: PageContext
}

const LandingPage: React.FC<PageProps> = ({ pageContext }) => (
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
    {get(pageContext, 'backgroundImage[0].localFile.childImageSharp.fluid') ? (
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
          as="article"
          dangerouslySetInnerHTML={{
            __html: pageContext.html
          }}
        />
      </SectionContainer>

      {get(pageContext, 'cta.show', false) && (
        <Button
          variant="contained"
          color="primary"
          as={pageContext?.cta?.link?.startsWith('/') ? Link : ExternalLink}
          href={get(pageContext, 'cta.link', '#')}
          className="mt-4"
        >
          {get(pageContext, 'cta.text', 'Get Started')}
        </Button>
      )}
    </Section>
  </>
)

export default LandingPage
