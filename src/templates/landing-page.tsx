import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import get from 'lodash/get'
import trim from 'lodash/trim'
import SEO from '../components/SEO'
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
      keywords={get(pageContext, 'seo.keywords') || ['flamelink', pageContext.title]}
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
    </Section>
  </>
)

export default LandingPage
