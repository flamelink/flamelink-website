import React from 'react'
import Layout from '../components/Layout'
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

const SecurityPage: React.FC<PageProps> = ({ pageContext }) => (
  <Layout>
    <SEO
      keywords={['flamelink', pageContext.title]}
      title={pageContext.title}
    />
    <PageBanner title={pageContext.title} />
    <Section className="bg-white">
      <SectionContainer>
        <PageContent
          dangerouslySetInnerHTML={{
            __html: pageContext.html
          }}
        />
      </SectionContainer>
    </Section>
  </Layout>
)

export default SecurityPage
