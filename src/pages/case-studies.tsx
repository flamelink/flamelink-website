import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import PageBanner from '../components/PageBanner'
import ContactUsSection from '../components/ContactUsSection'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import { CaseStudiesPageQueryQuery } from '../../types/graphql-types'

let caseStudiesPageSubscription: any
let caseStudiesSubscription: any

function CaseStudiesPage({ data }: { data: CaseStudiesPageQueryQuery }) {
  const [realtimeContent, setRealtimeContent] = React.useState()
  const [realtimeCaseStudies, setRealtimeCaseStudies] = React.useState()

  if (!caseStudiesPageSubscription) {
    console.log('Subscription created for caseStudiesPage')
    caseStudiesPageSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'caseStudiesPage',
      populate: true,
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the caseStudiesPage content. Details:',
            error
          )
        }
        setRealtimeContent({ realtime: true, ...result })
      }
    })
  }

  if (!caseStudiesSubscription) {
    console.log('Subscription created for caseStudies')
    caseStudiesSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'caseStudies',
      populate: true,
      callback: async (error: any, result: Object) => {
        if (error) {
          return console.error(
            'Something went wrong while retrieving caseStudies content. Details:',
            error
          )
        }

        setRealtimeCaseStudies({
          realtime: true,
          caseStudies: reduce(
            result,
            (arr: any[], c) => {
              if (get(c, '_fl_meta_.status') === 'publish') {
                arr.push(c)
              }
              return arr
            },
            []
          )
        })
      }
    })
  }

  const pageData =
    realtimeContent || get(data, 'flamelinkCaseStudiesPageContent', {})

  const serverCaseStudies = React.useMemo(() => {
    return get(data, 'caseStudies.edges', []).map(edge => edge.node)
  }, [data])

  const caseStudies = get(realtimeCaseStudies, 'caseStudies', serverCaseStudies)

  const { realtime, pageTitle, excerpt, useCasesSection } = pageData

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
        <CaseStudiesRevealSection
          realtime={realtime}
          caseStudies={caseStudies}
        />
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
    caseStudies: allFlamelinkCaseStudiesContent(
      filter: { _fl_meta_: { status: { eq: "publish" } } }
    ) {
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
            content {
              childMarkdownRemark {
                html
              }
            }
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
