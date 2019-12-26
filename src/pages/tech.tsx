import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ExternalLink from '../components/ExternalLink'
import PageBanner from '../components/PageBanner'
import { Section, SectionContainer } from '../components/Section'
import ContactUsSection from '../components/ContactUsSection'
import ImageRevealSection from '../components/ImageRevealSection'
import IconCopyBlocks from '../components/IconCopyBlocks'
import CaseStudiesRevealSection from '../components/CaseStudiesRevealSection'

function TechPage({ data }) {
  const {
    pageTitle,
    overviewSection,
    featuresSection,
    caseStudiesSection,
    packagesSection
  } = get(data, 'flamelinkTechPersonaPageContent', {})

  return (
    <Layout>
      <SEO keywords={['flamelink', 'coding', 'technology']} title={pageTitle} />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <PageBanner title={pageTitle} />
        <ImageRevealSection
          bg="white"
          heading={overviewSection.title}
          content={overviewSection.excerpt}
          imagePosition={overviewSection.imagePosition}
          imageYOverlap={overviewSection.imageYOverlap}
          fluidImage={get(overviewSection, 'image[0].localFile')}
        />
        <Section className="bg-gray-100">
          <SectionContainer>
            <p className="text-center max-w-4xl mb-15">
              {featuresSection.excerpt}
            </p>
            <IconCopyBlocks
              className="-mb-10"
              blocks={get(featuresSection, 'features', []).map(feature => ({
                title: feature.title,
                iconUrl: feature.icon[0].url
              }))}
            />
          </SectionContainer>
        </Section>
        <CaseStudiesRevealSection
          title={caseStudiesSection.title}
          caseStudies={caseStudiesSection.caseStudies}
        />
        <Section className="bg-gray-100">
          <SectionContainer
            css={css`
              ${tw`block w-full`}
            `}
          >
            <ul className="flex justify-between items-stretch flex-no-wrap">
              {get(packagesSection, 'packages', []).map(pkg => (
                <li
                  key={pkg.name}
                  css={css`
                    max-width: 15.375rem;
                    width: 100%;
                    height: auto;
                    flex-shrink: 1;
                    flex-grow: 0;
                    transition: all 250ms ease;
                    margin: 0 1rem;

                    :hover {
                      transform: scale(1.1);
                    }
                  `}
                >
                  {get(pkg, 'logo[0].localFile.childImageSharp.fluid') &&
                    (pkg.link ? (
                      <ExternalLink href={pkg.link}>
                        <Img
                          fluid={pkg.logo[0].localFile.childImageSharp.fluid}
                          title={pkg.name}
                        />
                      </ExternalLink>
                    ) : (
                      <Img
                        fluid={pkg.logo[0].localFile.childImageSharp.fluid}
                        title={pkg.name}
                      />
                    ))}
                </li>
              ))}
            </ul>
          </SectionContainer>
        </Section>
        <ContactUsSection />
      </main>
    </Layout>
  )
}

export default TechPage

export const query = graphql`
  query TechPersonaPageQuery {
    flamelinkTechPersonaPageContent {
      pageTitle
      overviewSection {
        imageYOverlap
        imagePosition
        excerpt
        title
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
      featuresSection {
        excerpt
        features {
          title
          icon {
            url
          }
        }
      }
      caseStudiesSection {
        title
        caseStudies {
          title
          slug
          excerpt
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
      packagesSection {
        packages {
          name
          link
          logo {
            localFile {
              childImageSharp {
                fluid(maxWidth: 460) {
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
