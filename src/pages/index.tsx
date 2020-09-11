import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import InterfacesSlider from '../components/InterfacesSlider'
import HomepageSlider from '../components/HomepageSlider'
import CaseStudiesSlider from '../components/CaseStudiesSlider'
import TestimonialsSlider from '../components/TestimonialsSlider'
import NewsletterSection from '../components/NewsletterSection'
import HowItWorks from '../components/HowItWorks'
import IconCopyBlocks from '../components/IconCopyBlocks'
import { PageContent } from '../components/PageContent'
import { HomePageQueryQuery } from '../../types/graphql-types'

function HomePage({ data }: { data: HomePageQueryQuery }) {
  const pageData = get(data, 'flamelinkHomePageContent')

  if (!pageData) {
    return (
      <h2 className="text-heading text-center text-xl">
        Page data failed to load :(
      </h2>
    )
  }

  return (
    <>
      <SEO
        keywords={[
          'flamelink',
          'cms',
          'firebase',
          'realtime',
          'database',
          'firestore',
          'google cloud platform',
          'gcp',
          'content management',
          'headless'
        ]}
        title="Home"
        url=""
        meta={[
          { property: 'og:video', content: 'https://youtu.be/8Cw5ktNADBQ' }
        ]}
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
        `}
      >
        <HomepageSlider banners={get(pageData, 'banner', [])} />

        {/* FIREBASE + GCP SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle
              css={css`
                ${tw`mb-10`}
              `}
            >
              {get(pageData, 'firebaseSection.title', '')}
            </SectionTitle>
            {get(
              pageData,
              'firebaseSection.image[0].localFile.childImageSharp.fluid'
            ) && (
              <span className="block w-1/2 sm:w-64 md:w-1/3 lg:w-1/4 max-w-full mx-auto mb-10">
                <Img
                  fluid={get(
                    pageData,
                    'firebaseSection.image[0].localFile.childImageSharp.fluid'
                  )}
                  alt="Google Cloud Platform + Firebase + Flamelink"
                />
              </span>
            )}
            <PageContent
              css={css`
                ${tw`text-center text-base md:text-lg max-w-5xl mb-8 md:mb-16`}
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  pageData,
                  'firebaseSection.excerpt.childMarkdownRemark.html',
                  ''
                )
              }}
            />
            <ul className="flex flex-col md:flex-row justify-center items-stretch text-center">
              {get(pageData, 'firebaseSection.personas', []).map(persona => (
                <li
                  key={persona.title}
                  className="flex flex-col justify-start items-center flex-shrink-0 flex-grow-0 border-2 border-gray-400 rounded py-6 md:py-10 px-8 lg:px-12 mb-4 md:mb-0"
                  css={props => css`
                    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);

                    @media screen and (min-width: ${props.screens.md}) {
                      margin-left: 1rem;
                      margin-right: 1rem;
                    }

                    @media screen and (min-width: ${props.screens.lg}) {
                      margin-left: 1.875rem;
                      margin-right: 1.875rem;
                    }

                    &:last-child {
                      margin-bottom: 0;
                    }
                  `}
                >
                  {get(persona, 'icon[0].url') && (
                    <span className="w-15 h-15 mb-5">
                      <img
                        src={persona.icon[0].url}
                        alt=""
                        loading="lazy"
                        width="60"
                        height="60"
                      />
                    </span>
                  )}
                  <h3 className="text-xl font-medium text-heading leading-snug">
                    {persona.title}
                  </h3>
                  <ul
                    css={css`
                      ${tw`flex flex-col justify-start items-center leading-normal`}

                      min-width: 10.625rem;
                      margin: 0.625rem 0 1.25rem;
                      flex-grow: 1;
                    `}
                  >
                    {persona.keyPoints.map(keyPoint => (
                      <li key={keyPoint}>{keyPoint}</li>
                    ))}
                  </ul>
                  <Button
                    variant="outlined"
                    color="primary"
                    as={Link}
                    to={get(persona, 'cta.link', '')}
                    data-click-type="cta"
                    data-click-location="firebase gcp section"
                    data-click-text="learn more"
                  >
                    {get(persona, 'cta.text', '')}
                  </Button>
                </li>
              ))}
            </ul>
          </SectionContainer>
        </Section>

        {/* INTERFACE SECTION */}
        <InterfacesSlider />

        {/* HOW FLAMELINK WORKS SECTION */}
        <HowItWorks data={get(pageData, 'howItWorksSection', {})} />

        {/* CASE STUDIES SECTION */}
        <CaseStudiesSlider data={get(pageData, 'caseStudiesSection', {})} />

        {/* KEY FEATURES SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'featuresSection.title', '')}
            </SectionTitle>
            <IconCopyBlocks
              blocks={get(pageData, 'featuresSection.keyFeatures', []).map(
                feature => ({
                  title: feature.title,
                  excerpt: feature.excerpt,
                  iconUrl: get(feature, 'icon[0].url')
                })
              )}
              className="max-w-full"
              wider
            />
            <Button
              variant="contained"
              color="primary"
              as={Link}
              to={get(pageData, 'featuresSection.cta.link', '')}
              className="mt-5"
              data-click-type="cta"
              data-click-location="key features section"
              data-click-text="learn more"
            >
              {get(pageData, 'featuresSection.cta.text', '')}
            </Button>
          </SectionContainer>
        </Section>

        {/* TESTIMONIALS SECTION */}
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'testimonialsSection.title', '')}
            </SectionTitle>
            <TestimonialsSlider
              testimonials={get(
                pageData,
                'testimonialsSection.testimonials',
                []
              )}
            />
          </SectionContainer>
        </Section>

        {/* AFFILIATES SECTION */}
        <Section className="bg-white">
          <SectionContainer
            css={css`
              ${tw`block w-full`}
            `}
          >
            <ul className="flex justify-between items-center flex-no-wrap">
              {get(pageData, 'affiliatesSection.affiliates', []).map(
                affiliate => (
                  <li
                    key={affiliate.name}
                    css={css`
                      max-width: 10rem;
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
                    {get(
                      affiliate,
                      'logo[0].localFile.childImageSharp.fluid'
                    ) &&
                      (affiliate.website ? (
                        <ExternalLink href={affiliate.website}>
                          <Img
                            fluid={
                              affiliate.logo[0].localFile.childImageSharp.fluid
                            }
                            title={affiliate.name}
                            alt={affiliate.name}
                          />
                        </ExternalLink>
                      ) : (
                        <Img
                          fluid={
                            affiliate.logo[0].localFile.childImageSharp.fluid
                          }
                          alt={affiliate.name}
                          title={affiliate.name}
                        />
                      ))}
                  </li>
                )
              )}
            </ul>
          </SectionContainer>
        </Section>

        {/* NEWSLETTER SECTION */}
        <NewsletterSection data={get(pageData, 'newsletterSection', {})} />
      </main>
    </>
  )
}

export default HomePage

export const query = graphql`
  query HomePageQuery {
    flamelinkHomePageContent {
      banner {
        title1
        title2
        excerpt
        ctas {
          text
          action
          buttonType
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      firebaseSection {
        title
        excerpt {
          childMarkdownRemark {
            html
          }
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 460) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        personas {
          title
          icon {
            url
          }
          keyPoints
          cta {
            text
            link
          }
        }
      }
      howItWorksSection {
        title
        steps {
          url
          uniqueKey
          excerpt
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
          brandColour
          excerpt
          backgroundImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
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
      featuresSection {
        title
        cta {
          text
          link
        }
        keyFeatures {
          title
          excerpt
          icon {
            url
          }
        }
      }
      testimonialsSection {
        title
        testimonials {
          avatar {
            localFile {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          name
          jobTitle
          quote
        }
      }
      affiliatesSection {
        affiliates {
          name
          website
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
      newsletterSection {
        excerpt
        title
        placeholderText
      }
    }
  }
`
