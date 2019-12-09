import React from 'react'
import { Button } from 'reakit/Button'
import { Group } from 'reakit/Group'
import { useRoverState, Rover } from 'reakit/Rover'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import Carousel from './Carousel'
import { SectionContainer, SectionTitle } from './Section'
import ArrowLeftIcon from '../icons/ArrowLeft'
import ArrowRightIcon from '../icons/ArrowRight'
import { Link } from 'gatsby'
import ArrowRight from '../icons/ArrowRight'

type LocalFile = {
  childImageSharp: any // TODO: improve types
}

type FileObj = {
  localFile: LocalFile
}

type CaseStudy = {
  title: string
  slug: string
  brandColour: string
  excerpt: string
  logo: FileObj[]
  backgroundImage: FileObj[]
}

type SectionData = {
  title: string
  caseStudies: CaseStudy[]
}

type Props = {
  sectionData: SectionData
}

const Dots: React.FC<{
  slides: unknown[]
  active: number
  setActive: (n: number) => void
}> = ({ slides, active, setActive }) => {
  const rover = useRoverState({ loop: true, orientation: 'horizontal' })

  return (
    <Group
      className="carousel-indicators"
      css={css`
        ${tw`flex items-center justify-center pb-15 pt-1`}
      `}
    >
      {slides.map((_, index) => (
        <Rover
          key={index}
          {...rover}
          as={Button}
          onClick={() => setActive(index)}
          css={css`
            ${tw`
            mx-1
            h-3
            w-3
            rounded-full
            cursor-pointer
            hover:bg-gray-600
            focus:shadow-outline
          `}

            outline: 0 !important;
            ${active === index ? tw`bg-gray-600` : tw`bg-gray-400`}
          `}
          className={active === index ? 'active' : ''}
        />
      ))}
    </Group>
  )
}

const CaseStudiesSlider: React.FC<Props> = ({ sectionData }) => {
  const { title, caseStudies } = sectionData

  return (
    <Carousel slides={caseStudies} interval={0}>
      {({
        originalSlides,
        slides,
        active,
        setActive,
        handlers,
        style,
        prev,
        next
      }) => (
        <div
          className="w-full flex justify-start items-stretch relative"
          {...handlers}
          style={style}
        >
          {(slides as CaseStudy[]).map((slide, index) => (
            <BackgroundImage
              key={index}
              Tag="section"
              className="w-screen pt-20 pb-20"
              fluid={get(
                slide,
                'backgroundImage[0].localFile.childImageSharp.fluid'
              )}
              backgroundColor={get(slide, 'brandColour', '#f5f5f5')}
            >
              <div className="flex flex-col justify-start items-center">
                <SectionContainer>
                  <SectionTitle
                    css={css`
                      ${tw`text-white`}
                    `}
                  >
                    {title}
                  </SectionTitle>
                  <div className="w-full flex justify-start items-center flex-grow-0 flex-shrink-0">
                    {originalSlides.length > 1 && (
                      <Button
                        onClick={prev}
                        className="mr-16 mt-16 text-white focus:shadow-outline"
                        css={css`
                          :focus {
                            outline: 0;
                          }
                        `}
                      >
                        <ArrowLeftIcon />
                      </Button>
                    )}
                    <div className="block w-full overflow-x-hidden overflow-y-visible flex-grow flex-shrink">
                      <div
                        className="carousel-content-wrapper"
                        css={css`
                          ${tw`flex flex-col justify-start items-stretch bg-white`}

                          opacity: 0.96;
                        `}
                      >
                        <div
                          className="carousel-content"
                          css={css`
                            ${tw`flex justify-start items-stretch relative`}
                          `}
                        >
                          <div className="flex w-full relative">
                            <div
                              className="carousel-item"
                              css={css`
                                ${tw`text-center px-8 pt-15 pb-8 w-full z-10 bg-white relative flex-grow-1`}
                              `}
                            >
                              <div
                                css={css`
                                  ${tw`flex flex-col justify-center items-stretch h-full`}
                                `}
                              >
                                {get(
                                  slide,
                                  'logo[0].localFile.childImageSharp.fluid'
                                ) && (
                                  <span className="block w-1/2 sm:w-64 md:w-1/3 lg:w-1/4 max-w-full mx-auto mb-10">
                                    <Img
                                      fluid={
                                        slide.logo[0].localFile.childImageSharp
                                          .fluid
                                      }
                                    />
                                  </span>
                                )}
                                <h3 className="text-2xl font-light text-heading mb-6">
                                  {slide.title}
                                </h3>
                                <p className="text-sm mb-8">{slide.excerpt}</p>
                                <div>
                                  <Link
                                    to={`/case-studies/${slide.slug}`}
                                    className="uppercase mb-10 inline-block"
                                    style={{ color: get(slide, 'brandColour') }}
                                  >
                                    Learn More{' '}
                                    <ArrowRight
                                      className="inline-block"
                                      css={css`
                                        height: 0.875rem;
                                      `}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {originalSlides.length > 1 && (
                          <Dots
                            slides={originalSlides}
                            setActive={setActive}
                            active={active}
                          />
                        )}
                      </div>
                    </div>
                    {originalSlides.length > 1 && (
                      <Button
                        onClick={next}
                        className="ml-16 mt-16 text-white focus:shadow-outline"
                        css={css`
                          :focus {
                            outline: 0;
                          }
                        `}
                      >
                        <ArrowRightIcon />
                      </Button>
                    )}
                  </div>
                </SectionContainer>
              </div>
            </BackgroundImage>
          ))}
        </div>
      )}
    </Carousel>
  )
}

export default CaseStudiesSlider
