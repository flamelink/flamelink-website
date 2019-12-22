import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import PageBanner from '../components/PageBanner'
import ContactUsSection from '../components/ContactUsSection'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'

function CaseStudiesPage({ data }) {
  const caseStudies = React.useMemo(() => {
    return get(data, 'allFlamelinkCaseStudiesContent.edges', []).map(
      edge => edge.node
    )
  }, [data])

  return (
    <Layout>
      <SEO keywords={['flamelink', 'case studies']} title="Case Studies" />
      <main>
        <PageBanner title="Case Studies" />
        <Section className="bg-white">
          <SectionContainer
            as="aside"
            css={css`
              ${tw`leading-normal text-body font-normal text-center max-w-3xl`}
            `}
          >
            Flamelink is trusted by thousands of Developers around the world to
            manage the content infrastructure of their Firebase projects.
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>These include</SectionTitle>
          </SectionContainer>
        </Section>
        <CaseStudiesRevealSection
          title="Case Studies"
          caseStudies={caseStudies}
        />
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default CaseStudiesPage

export const query = graphql`
  query CaseStudiesQuery {
    allFlamelinkCaseStudiesContent {
      edges {
        node {
          title
          slug
          excerpt
          brandColour
          pageSections {
            imageYOverlap
            imagePosition
            heading
            content
            icon {
              url
            }
            image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          logo {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          backgroundImage {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          mainImage {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
