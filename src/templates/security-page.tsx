import React from 'react'
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
  <>
    <SEO
      keywords={['flamelink', pageContext.title]}
      title={pageContext.title}
      description="Security and compliance are top priorities for Flamelink because they are fundamental to your experience with our product. Flamelink is committed to securing your application’s data, eliminating systems vulnerability, and ensuring continuity of service."
      url="/security"
    />
    <PageBanner title={pageContext.title} />
    <Section className="bg-white">
      <SectionContainer>
        <PageContent as="article"
          dangerouslySetInnerHTML={{
            __html: pageContext.html
          }}
        />
      </SectionContainer>
    </Section>
  </>
)

export default SecurityPage
