import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import InterfacesSlider, {
  InterfacesSliderProps,
  InterfaceSlide
} from '../components/InterfacesSlider'
import HomepageSlider from '../components/HomepageSlider'
import CaseStudiesSlider from '../components/CaseStudiesSlider'
import TestimonialsSlider from '../components/TestimonialsSlider'
import NewsletterSection from '../components/NewsletterSection'

function HomePage({ data }) {
  const pageData = get(data, 'flamelinkHomePageContent')

  if (!pageData) {
    return (
      <h2 className="text-heading text-center text-xl">
        Page data failed to load :(
      </h2>
    )
  }

  return (
    <Layout>
      <SEO
        keywords={[
          'flamelink',
          'cms',
          'firebase',
          'realtime',
          'database',
          'firestore',
          'google cloud platform',
          'content management',
          'headless'
        ]}
        title="Home"
      />
      <main
        css={css`
          scroll-snap-type: proximity;
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
                />
              </span>
            )}
            <p className="text-center text-lg max-w-4xl mb-20">
              {get(pageData, 'firebaseSection.excerpt', '')}
            </p>
            <ul className="flex flex-col md:flex-row justify-center items-stretch">
              {get(pageData, 'firebaseSection.personas', []).map(persona => (
                <li
                  key={persona.title}
                  className="flex flex-col justify-start items-center flex-shrink-0 flex-grow-0 border-2 border-gray-400 rounded py-10 px-12 mb-4 md:mb-0"
                  css={css`
                    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
                    margin-left: 1.875rem;
                    margin-right: 1.875rem;

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
                  >
                    {get(persona, 'cta.text', '')}
                  </Button>
                </li>
              ))}
            </ul>
          </SectionContainer>
        </Section>

        {/* INTERFACE SECTION */}
        <Section className="bg-gray-100">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'interfaceSection.title', 'Content Interface')}
            </SectionTitle>
          </SectionContainer>
          <InterfacesSlider
            slides={
              get(pageData, 'interfaceSection.images', []).map(
                (image: unknown, idx: number) => ({
                  inputId: `s${idx + 1}`,
                  slideId: `slide${idx + 1}`,
                  image: get(
                    image,
                    'localFile.childImageSharp.fluid'
                  ) as InterfaceSlide
                })
              ) as InterfacesSliderProps['slides']
            }
          />
          <Button
            variant="contained"
            color="primary"
            as={ExternalLink}
            href={get(pageData, 'interfaceSection.cta.url', '#')}
          >
            {get(pageData, 'interfaceSection.cta.text', 'Get Started')}
          </Button>
        </Section>

        {/* HOW FLAMELINK WORKS SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'howItWorksSection.title', '')}
            </SectionTitle>
            <ol className="flex flex-col md:flex-row justify-center items-stretch md:text-center">
              {get(pageData, 'howItWorksSection.steps', []).map(step => (
                <li
                  key={step.uniqueKey}
                  className="flex flex-col justify-start items-start md:items-center mb-4 md:mb-0"
                  css={css`
                    margin-left: 1.8175rem;
                    margin-right: 1.8175rem;

                    &:last-child {
                      margin-bottom: 0;
                    }
                  `}
                >
                  {get(step, 'icon[0].url') && (
                    <span className="w-10 h-10">
                      <img
                        src={step.icon[0].url}
                        alt=""
                        loading="lazy"
                        width="40"
                        height="40"
                      />
                    </span>
                  )}
                  <h3
                    className="text-xl leading-tight"
                    style={{ marginBottom: '0.625rem' }}
                  >
                    {step.title}
                  </h3>
                  <span className="text-sm">{step.excerpt}</span>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </Section>

        {/* CASE STUDIES SECTION */}
        <CaseStudiesSlider
          sectionData={get(pageData, 'caseStudiesSection', {})}
        />

        {/* KEY FEATURES SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'featuresSection.title', '')}
            </SectionTitle>
            <ul className="flex flex-wrap flex-grow-0 flex-shrink-0 justify-center align-start mb-5">
              {get(pageData, 'featuresSection.keyFeatures', []).map(feature => (
                <li
                  key={feature.title}
                  css={css`
                    ${tw`text-center flex flex-col items-center justify-start`}

                    margin: 0 1.5rem 2.5rem;
                    max-width: 19.0625rem;
                  `}
                >
                  {get(feature, 'icon[0].url') && (
                    <span className="w-10 h-10">
                      <img
                        src={feature.icon[0].url}
                        alt=""
                        loading="lazy"
                        width="40"
                        height="40"
                      />
                    </span>
                  )}
                  <h3
                    className="text-xl text-heading font-medium"
                    style={{ margin: '0.625rem 0' }}
                  >
                    {feature.title}
                  </h3>
                  <p>{feature.excerpt}</p>
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              color="primary"
              as={Link}
              to={get(pageData, 'featuresSection.cta.link', '')}
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
                    title={affiliate.name}
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
                    {affiliate.website ? (
                      <ExternalLink href={affiliate.website}>
                        <Img
                          fluid={
                            affiliate.logo[0].localFile.childImageSharp.fluid
                          }
                        />
                      </ExternalLink>
                    ) : (
                      <Img
                        fluid={
                          affiliate.logo[0].localFile.childImageSharp.fluid
                        }
                      />
                    )}
                  </li>
                )
              )}
            </ul>
          </SectionContainer>
        </Section>

        {/* NEWSLETTER SECTION */}
        <NewsletterSection data={get(pageData, 'newsletterSection', {})} />
      </main>
    </Layout>
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
        excerpt
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
          icon
          keyPoints
          cta {
            text
            link
          }
        }
      }
      interfaceSection {
        title
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1440, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        cta {
          url
          text
        }
      }
      howItWorksSection {
        title
        steps {
          url
          uniqueKey
          excerpt
          title
          icon
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
