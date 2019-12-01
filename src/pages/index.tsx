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
import Carousel from '../components/Carousel'
import InterfacesSlider, {
  InterfacesSliderProps,
  InterfaceSlide
} from '../components/InterfacesSlider'

const Envelope = styled.div`
  ${tw`right-0 bottom-0 absolute z-0`}
`

function HomePage({ data }) {
  const pageData = get(data, 'flamelinkHomePageContent')

  if (!pageData) {
    return <h2>Page data failed to load :(</h2>
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
              <span className="text-6xl uppercase">made easy!</span>
            </h1>
            <p className="text-white mb-8 max-w-md">
              Flamelink plugs straight into Firebase, putting you in charge of
              your content and saving you time.
            </p>
            <Group>
              <Button variant="outlined" color="secondary">
                Demo Video
              </Button>
            </Group>
          </PageContainer>
        </PageBanner>

        {/* FIREBASE + GCP SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'firebaseSection.title', '')}
            </SectionTitle>
            <p>{get(pageData, 'firebaseSection.excerpt', '')}</p>
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
            <ol>
              {get(pageData, 'howItWorksSection.steps', []).map(step => (
                <li key={step.uniqueKey}>
                  <h3>{step.title}</h3>
                  <span>{step.excerpt}</span>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </Section>

        {/* CASE STUDIES SECTION */}
        <Section
          style={{
            backgroundColor: get(
              pageData,
              'caseStudiesSection.caseStudies[0].brandColour',
              '#fff'
            )
          }}
        >
          <SectionContainer>
            <SectionTitle
              css={css`
                ${tw`text-white`}
              `}
            >
              {get(pageData, 'caseStudiesSection.title', '')}
            </SectionTitle>
          </SectionContainer>
        </Section>

        {/* KEY FEATURES SECTION */}
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>
              {get(pageData, 'featuresSection.title', '')}
            </SectionTitle>
            <ul>
              {get(pageData, 'featuresSection.keyFeatures', []).map(feature => (
                <li key={feature.title}>
                  <h3>{feature.title}</h3>
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
            <Carousel
              slides={get(pageData, 'testimonialsSection.testimonials', [])}
              interval={0}
            >
              {({
                originalSlides,
                slides,
                active,
                setActive,
                handlers,
                style
              }) => (
                <div className="block w-full overflow-x-hidden">
                  <div
                    className="carousel-content"
                    css={css`
                      ${tw`flex justify-start items-stretch bg-white`}
                      height:
                    `}
                    {...handlers}
                    style={style}
                  >
                    {slides.map((slide, index) => (
                      <div
                        className="carousel-item"
                        key={index}
                        css={css`
                          ${tw`text-center px-8 py-15 w-full`}
                        `}
                      >
                        <blockquote
                          css={css`
                            ${tw`mb-10`}

                            font-size: 1.375rem;
                          `}
                        >
                          &quot;{slide.quote}&quot;
                        </blockquote>
                        <h3
                          css={css`
                            ${tw`text-xl`}
                          `}
                        >
                          {slide.name}
                        </h3>
                        <h4
                          css={css`
                            ${tw`text-sm`}
                          `}
                        >
                          {slide.jobTitle}
                        </h4>
                      </div>
                    ))}
                  </div>
                  {originalSlides.length > 1 && (
                    <ol
                      className="carousel-indicators"
                      css={css`
                        ${tw`flex items-center justify-center`}
                      `}
                    >
                      {originalSlides.map((_, index) => (
                        <li
                          onClick={() => setActive(index)}
                          key={index}
                          css={css`
                            ${tw`
                            w-3 h-3
                            mx-1
                            rounded-full
                          `}

                            ${active === index
                              ? tw`bg-gray-600`
                              : tw`bg-gray-400`}
                          `}
                          className={active === index ? 'active' : ''}
                        ></li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </Carousel>
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
              width: 50%;

              /* TODO: Figure this out for the different sizes - will probably need many custom media queries */
              @media screen and (min-width: 640px) {
                width: 37%;
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
          brandColour
          excerpt
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
            localFile {
              childImageSharp {
                fixed {
                  base64
                  tracedSVG
                  aspectRatio
                  width
                  height
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  originalName
                }
              }
            }
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
