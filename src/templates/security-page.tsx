import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import { PageContent } from '../components/page-content'
import { Section, SectionContainer } from '../components/section'

type Props = {
  data: any // FIXME: don't use any
}

const SecurityPage: React.FC<Props> = ({ data }) => {
  const page = data.allFlamelinkSecurityPageContent.edges[0].node

  return (
    <Layout>
      <SEO keywords={['flamelink', page.title]} title={page.title} />
      <PageHeader title={page.title} />
      <Section className="bg-white">
        <SectionContainer>
          <PageContent
            dangerouslySetInnerHTML={{
              __html: page.content.childMarkdownRemark.html
            }}
          />
        </SectionContainer>
      </Section>
    </Layout>
  )
}

export default SecurityPage

export const query = graphql`
  query($slug: String!, $locale: String!) {
    allFlamelinkSecurityPageContent(
      filter: { flamelink_locale: { eq: $locale }, slug: { eq: $slug } }
      limit: 1
    ) {
      edges {
        node {
          id
          title
          slug
          content {
            id
            childMarkdownRemark {
              timeToRead
              html
            }
          }
        }
      }
    }
  }
`
