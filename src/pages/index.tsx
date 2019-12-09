import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Group } from 'reakit/Group'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageBanner from '../components/PageBanner'
import PageContainer from '../components/PageContainer'
import { Section, SectionContainer, SectionTitle } from '../components/Section'
import Button from '../components/Button'
import ExternalLink from '../components/ExternalLink'
import InterfacesSlider, {
  InterfacesSliderProps,
  InterfaceSlide
} from '../components/InterfacesSlider'
import CaseStudiesSlider from '../components/CaseStudiesSlider'
import TestimonialsSlider from '../components/TestimonialsSlider'
import Modal from '../components/Modal'

const Envelope = styled.div`
  ${tw`right-0 bottom-0 absolute z-0`}
`

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
      <main>
        <PageBanner>
          <PageContainer>
            <h1 className="flex flex-col justify-start items-start text-white font-normal leading-none text-5xl mb-8">
              <span>Your workflow</span>
              <span
                className="uppercase"
                css={css`
                  font-size: 3.125rem;
                `}
              >
                made easy!
              </span>
            </h1>
            <p className="text-white text-lg mb-8 max-w-md">
              Flamelink plugs straight into Firebase, putting you in charge of
              your content and saving you time.
            </p>
            <Group>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: '1rem' }}
              >
                Learn More
              </Button>
              <Modal
                aria-label="play demo video"
                disclosure={
                  <Button variant="outlined" color="secondary">
                    Demo Video
                  </Button>
                }
              >
                <video src="https://www.youtube.com/embed/8Cw5ktNADBQ?=controls=0&rel=0&showinfo=0&autoplay=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=en&wmode=transparent&modestbranding=1&disablekb=1&origin=https%3A%2F%2Fflamelink.io&enablejsapi=1&widgetid=4" />
              </Modal>
            </Group>
          </PageContainer>
        </PageBanner>

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
        <Section
          className="bg-gray-100"
          css={css`
            ${tw`relative overflow-visible`}
          `}
        >
          <div
            css={css`
              ${tw`z-10`}
            `}
          >
            <SectionContainer>
              <SectionTitle
                css={css`
                  ${tw`text-brand`}
                `}
              >
                {get(pageData, 'newsletterSection.title', '')}
              </SectionTitle>
              <input
                type="email"
                name="newsletter"
                className="py-5 px-8 text-4xl mb-10"
                placeholder={get(
                  pageData,
                  'newsletterSection.placeholderText',
                  ''
                )}
              />
              <p>{get(pageData, 'newsletterSection.excerpt', '')}</p>
            </SectionContainer>
          </div>
          <Envelope
            css={css`
              display: none; /* TODO: Chat to Eddie */
              width: 40%;

              /* TODO: Figure this out for the different sizes - will probably need many custom media queries */
              @media screen and (min-width: 640px) {
                width: 30%;
              }
            `}
          >
            <Img fluid={data.newsletterEnvelope.childImageSharp.fluid} />
          </Envelope>
        </Section>
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
        cta {
          text
          action
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
      firebaseSection {
        title
        excerpt
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
      newsletterSection {
        excerpt
        title
        placeholderText
      }
    }
    # Envelope image used for Newsletter Section
    newsletterEnvelope: file(name: { eq: "envelope" }) {
      childImageSharp {
        # fixed(width: 533, height: 443) {
        #   ...GatsbyImageSharpFixed
        # }
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
