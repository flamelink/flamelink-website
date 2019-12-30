import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import PageBanner from '../components/PageBanner'
import ContactUsSection from '../components/ContactUsSection'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'

function CaseStudiesPage({ data }) {
  const caseStudies = React.useMemo(() => {
    return get(data, 'caseStudies.edges', []).map(edge => edge.node)
  }, [data])

  const { pageTitle, excerpt, useCasesSection } = get(
    data,
    'flamelinkCaseStudiesPageContent',
    {}
  )

  return (
    <>
      <SEO
        keywords={['flamelink', 'case studies', 'use cases']}
        title={pageTitle}
        description={excerpt}
        url="/case-studies"
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <Section className="bg-white">
          <SectionContainer
            css={css`
              ${tw`leading-normal text-body font-normal text-center max-w-3xl`}
            `}
          >
            {excerpt}
          </SectionContainer>
        </Section>
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>{get(useCasesSection, 'title', '')}</SectionTitle>
            <IconCopyBlocks
              className="-mb-10"
              blocks={get(useCasesSection, 'useCases', []).map(useCase => ({
                title: useCase.title,
                iconUrl: useCase.icon[0].url
              }))}
            />
          </SectionContainer>
        </Section>
        <CaseStudiesRevealSection caseStudies={caseStudies} />
        <ContactUsSection />
      </main>
    </>
  )
}

export default CaseStudiesPage

export const query = graphql`
  query CaseStudiesPageQuery {
    flamelinkCaseStudiesPageContent {
      pageTitle
      excerpt
      useCasesSection {
        title
        useCases {
          title
          icon {
            url
          }
        }
      }
    }
    caseStudies: allFlamelinkCaseStudiesContent {
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
