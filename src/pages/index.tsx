import React from 'react'
import { Group } from 'reakit/Group'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import SEO from '../components/SEO'
import {
  HomepageSection,
  HomepageSectionContainer,
  HomepageSectionTitle,
  HomepageSectionSubTitle
} from '../components/Section'
import { HomePageContent } from '../components/PageContent'
import { HomepageRedesignQuery } from '../../types/graphql-types'
import Modal from '../components/Modal'
import Button from '../components/Button'
import ArrowRight from '../icons/ArrowRight'
import DemoVideo from '../components/DemoVideo'
import ExternalLink from '../components/ExternalLink'
import { IoIosPlay as PlayIcon } from 'react-icons/io'
import { Box } from 'reakit/Box'

function HomePage({ data }: { data: HomepageRedesignQuery }) {
  const pageData = get(data, 'flamelinkHomepageRedesignContent')
  const ctaDemo = get(pageData, 'heroSection.ctaDemo')
  const ctaGetStarted = get(pageData, 'heroSection.ctaGetStarted')

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
        {/* HERO SECTION */}
        <HomepageSection
          className="bg-new-brand"
          css={css`
            ${tw`pl-16 pr-0 py-16 items-center`}
          `}
        >
          <HomepageSectionContainer>
            <HomepageSectionTitle>
              {get(pageData, 'heroSection.mainHeading', '')}
            </HomepageSectionTitle>
            <HomepageSectionSubTitle
              css={css`
                ${tw`mb-6`}
              `}
            >
              {get(pageData, 'heroSection.subHeading', '')}
            </HomepageSectionSubTitle>
            <HomePageContent
              css={css`
                ${tw`text-white font-semibold mx-0 mb-6`}
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  pageData,
                  'heroSection.heroText.childMarkdownRemark.html',
                  ''
                )
              }}
            />
            {get(
              pageData,
              'heroSection.heroImages[0].localFile.childImageSharp.fluid'
            ) && (
              <span className="block mb-10 max-w-xs">
                <Img
                  fluid={get(
                    pageData,
                    'heroSection.heroImages[0].localFile.childImageSharp.fluid'
                  )}
                  alt="Google Cloud Platform + Firebase + Flamelink"
                />
              </span>
            )}

            <Group className="flex flex-col md:flex-row flex-no-wrap justify-start items-start">
              <Button
                key={0}
                color="secondary"
                as={Link}
                to={ctaGetStarted.link}
                className="mb-4 md:mr-4"
                css={props => css`
                  ${!props.device.sizes.mdUp &&
                    css`
                      min-width: 10.75rem;
                    `}
                `}
                data-click-type="cta"
                data-click-location="homepage slider"
                data-click-text={ctaGetStarted.label}
              >
                {ctaGetStarted.label}
              </Button>
              <Modal
                key={0}
                aria-label="play demo video"
                className="bg-white"
                tabIndex={-1}
                disclosure={
                  <Button
                    icon={<PlayIcon />}
                    color="secondary"
                    className="mb-4 md:mr-4"
                    data-click-type="cta"
                    data-click-location="homepage hero section"
                    data-click-text={ctaDemo.text}
                  >
                    {ctaDemo.text}
                  </Button>
                }
              >
                {({ dialog }) => <DemoVideo visible={dialog.visible} />}
              </Modal>
            </Group>
          </HomepageSectionContainer>
          <HomepageSectionContainer>
            {get(
              pageData,
              'heroSection.heroImages[1].localFile.childImageSharp.fluid'
            ) && (
              <span className="w-full">
                <Img
                  fluid={get(
                    pageData,
                    'heroSection.heroImages[1].localFile.childImageSharp.fluid'
                  )}
                  alt="Flamelink Portal"
                />
              </span>
            )}
          </HomepageSectionContainer>
        </HomepageSection>

        {/* AFFILIATES SECTION */}
        <HomepageSection className="bg-white my-8">
          <HomepageSectionContainer
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
          </HomepageSectionContainer>
        </HomepageSection>

        {/* SPOTLIGHT SECTION */}
        <HomepageSection
          className="bg-new-brand"
          css={css`
            ${tw`px-44 h-screen items-center`}
          `}
        >
          <HomepageSectionContainer
            css={css`
              ${tw`pr-20`}
            `}
          >
            <HomepageSectionSubTitle
              css={css`
                ${tw`mb-4`}
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  pageData,
                  'spotlightSection.heading.childMarkdownRemark.html',
                  ''
                )
              }}
            ></HomepageSectionSubTitle>
            <HomePageContent
              css={css`
                ${tw`text-white font-normal mb-7`}
              `}
              dangerouslySetInnerHTML={{
                __html: get(
                  pageData,
                  'spotlightSection.excerpt.childMarkdownRemark.html',
                  ''
                )
              }}
            />
            <Link
              tabIndex={0}
              to={get(pageData, 'spotlightSection.cta.link', '')}
              className="text-white font-medium flex items-center"
              data-click-type="cta"
              data-click-location="spotlight section"
              data-click-text="read the full article"
            >
              <span>{get(pageData, 'spotlightSection.cta.label', '')}</span>
              <ArrowRight
                css={css`
                  height: 0.875rem;
                `}
              />
            </Link>
          </HomepageSectionContainer>
          <HomepageSectionContainer>
            {get(
              pageData,
              'spotlightSection.spotlightImage[0].localFile.childImageSharp.fluid'
            ) && (
              <span className="w-full">
                <Img
                  fluid={get(
                    pageData,
                    'spotlightSection.spotlightImage[0].localFile.childImageSharp.fluid'
                  )}
                  alt="Firebase blog post excerpt"
                />
              </span>
            )}
          </HomepageSectionContainer>
        </HomepageSection>

        {/* HOW IT WORKS */}
        <HomepageSection
          className="bg-gray-100"
          css={css`
            ${tw`flex-col items-center pt-40`}
          `}
        >
          <HomepageSectionSubTitle
            css={css`
              ${tw`text-new-brand mb-4`}
            `}
          >
            {get(pageData, 'howItWorksSection.heading', '')}
          </HomepageSectionSubTitle>
          <span className="mb-20">
            {get(pageData, 'howItWorksSection.subHeading', '')}
          </span>
          <span className="text-3xl font-light mb-10">
            {get(pageData, 'howItWorksSection.info', '')}
          </span>
          <HomepageSectionContainer
            css={css`
              ${tw`flex-row items-center mb-20`}
            `}
          >
            <Box className="flex-1 pr-8">
              <img
                src={get(pageData, 'howItWorksSection.image[0].url', '')}
                alt="integration example"
              />
            </Box>
            <Box className="flex-1">
              <h4
                css={css`
                  ${tw`text-new-brand mb-10 font-medium`}
                `}
              >
                {get(pageData, 'howItWorksSection.helper', '')}
              </h4>
              <div className="flex flex-row items-center mb-4">
                <img
                  src={get(pageData, 'howItWorksSection.image[1].url', '')}
                  alt="step 1"
                />
                <p className="ml-4 font-medium text-new-brand">
                  {get(pageData, 'howItWorksSection.steps.step1', '')}
                </p>
              </div>

              <div className="flex flex-row items-center mb-4">
                <img
                  src={get(pageData, 'howItWorksSection.image[2].url', '')}
                  alt="step 2"
                />
                <p className="ml-4">
                  {get(pageData, 'howItWorksSection.steps.step2', '')}
                </p>
              </div>

              <div className="flex flex-row items-center mb-4">
                <img
                  src={get(pageData, 'howItWorksSection.image[3].url', '')}
                  alt="step 3"
                />
                <p className="ml-4">
                  {get(pageData, 'howItWorksSection.steps.step3', '')}
                </p>
              </div>

              <div className="flex flex-row items-center mb-4">
                <img
                  src={get(pageData, 'howItWorksSection.image[4].url', '')}
                  alt="step 4"
                />
                <p className="ml-4">
                  {get(pageData, 'howItWorksSection.steps.step4', '')}
                </p>
              </div>

              <div className="flex flex-row items-center mb-4">
                <img
                  src={get(pageData, 'howItWorksSection.image[5].url', '')}
                  alt="step 5"
                />
                <p className="ml-4">
                  {get(pageData, 'howItWorksSection.steps.step5', '')}
                </p>
              </div>
            </Box>
          </HomepageSectionContainer>
          <Modal
            key={0}
            aria-label="play demo video"
            className="bg-white"
            tabIndex={-1}
            disclosure={
              <Button
                icon={<PlayIcon />}
                color="primary"
                className="mb-40"
                data-click-type="cta"
                data-click-location="homepage how it works section"
                data-click-text={ctaDemo.text}
              >
                {ctaDemo.text}
              </Button>
            }
          >
            {({ dialog }) => <DemoVideo visible={dialog.visible} />}
          </Modal>
        </HomepageSection>

        {/* USE CASES SECTION */}
        <HomepageSection
          className="bg-white"
          css={css`
            ${tw`h-screen`}
          `}
        >
          <HomepageSectionContainer
            className="bg-gray-100 mt-40 items-center"
            css={css`
              height: 576px;
            `}
          >
            <HomepageSectionSubTitle
              css={css`
                ${tw`text-new-brand mt-20`}
              `}
            >
              Use Cases
            </HomepageSectionSubTitle>
          </HomepageSectionContainer>
        </HomepageSection>

        {/* TRIAL SECTION */}
        <HomepageSection
          className="bg-new-brand"
          css={css`
            ${tw`h-1/2`}
          `}
        >
          <HomepageSectionContainer
            className="bg-white mt-40 mb-24 items-center"
            css={css`
              height: 400px;
            `}
          >
            <div className="mt-12 mb-4">
              <img
                src={get(pageData, 'trialSection.icon[0].url', '')}
                alt="rocket"
              />
            </div>

            <h4 className="text-22 text-new-brand font-medium mb-6">
              {get(pageData, 'trialSection.heading', '')}
            </h4>
            <h3 className="text-3xl font-light">
              {get(pageData, 'trialSection.info', '')}
            </h3>
            <Button
              dataClickLocation="trial"
              dataClickText={get(pageData, 'trialSection.cta.label', '')}
              variant="contained"
              color="primary"
              href="https://app.flamelink.io"
              className="mt-10"
              as={ExternalLink}
            >
              {get(pageData, 'trialSection.cta.label', '')}
            </Button>
          </HomepageSectionContainer>
        </HomepageSection>
      </main>
    </>
  )
}

export default HomePage

export const query = graphql`
  query HomepageRedesign {
    flamelinkHomepageRedesignContent {
      heroSection {
        mainHeading
        subHeading
        heroText {
          childMarkdownRemark {
            html
          }
        }
        heroImages {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        ctaDemo {
          text
          action
        }
        ctaGetStarted {
          label
          action
          link
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
      spotlightSection {
        heading {
          childMarkdownRemark {
            html
          }
        }
        excerpt {
          childMarkdownRemark {
            html
          }
        }
        cta {
          label
          link
        }
        spotlightImage {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      howItWorksSection {
        heading
        subHeading
        info
        helper
        image {
          url
        }
        steps {
          step1
          step2
          step3
          step4
          step5
        }
      }
      trialSection {
        icon {
          url
        }
        heading
        info
        cta {
          label
          action
        }
      }
    }
  }
`
