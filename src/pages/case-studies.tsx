import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import PageContainer from '../components/PageContainer'
import PageBanner from '../components/PageBanner'
import ContactUsSection from '../components/ContactUsSection'

function CaseStudiesPage({ data }) {
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
        <PageContainer>
          <section className="flex flex-col md:flex-row items-center">
            <ul className="">
              {data.allFlamelinkCaseStudiesContent.edges.map(edge => {
                const { title, slug, excerpt, brandColour } = edge.node
                return (
                  <li
                    style={{ backgroundColor: brandColour }}
                    className="text-white p-10"
                  >
                    <h2>{title}</h2>
                    <p>{excerpt}</p>
                    <Link to={`/case-studies/${slug}`}>View Case Study</Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </PageContainer>
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
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
          logo {
            localFile {
              childImageSharp {
                fluid {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
          backgroundImage {
            localFile {
              childImageSharp {
                fluid {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
  }
`
