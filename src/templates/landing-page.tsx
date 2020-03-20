import React from 'react'
import get from 'lodash/get'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import { PageContent } from '../components/PageContent'
import { Section, SectionContainer } from '../components/Section'

type PageContext = {
  isCreatedByStatefulCreatePages: boolean
  title: string
  slug: string
  locale: string
  html: string
}

type PageProps = {
  pageContext: PageContext
}

const LandingPage: React.FC<PageProps> = ({ pageContext }) => (
  <>
    <SEO
      keywords={['flamelink', pageContext.title]}
      title={get(pageContext, 'seo.title', get(pageContext, 'title', ''))}
      description={get(pageContext, 'seo.description', '')}
      url={get(pageContext, 'slug', '')}
    />
    <PageBanner title={pageContext.title} />
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
