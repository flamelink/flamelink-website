import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageContainer from '../components/PageContainer'
import PageBanner from '../components/PageBanner'
import { graphql, Link } from 'gatsby'

function CaseStudiesPage({ data }) {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'case studies']} title="Case Studies" />
      <main>
        <PageBanner title="Case Studies" />
        <PageContainer>
          <section className="flex flex-col md:flex-row items-center">
            <ul className="">
              {data.allFlamelinkCaseStudiesContent.edges.map(edge => {
                const { title, slug, excerpt, brandColour } = edge.node
                return (
                  <li style={{ backgroundColor: brandColour }} className="text-white p-10">
                    <h2>{title}</h2>
                    <p>{excerpt}</p>
                    <Link to={`/case-studies/${slug}`}>View Case Study</Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </PageContainer>
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
          testimonial
          pageSections {
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
