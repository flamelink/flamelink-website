import React from 'react'
import { Button } from 'reakit/Button'
import { Group } from 'reakit/Group'
import { Box } from 'reakit/Box'
import { useRoverState, Rover } from 'reakit/Rover'
import get from 'lodash/get'
import { css, SerializedStyles } from '@emotion/core'
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
  data: SectionData
  realtime?: boolean
}

const Dots: React.FC<{
  slides: unknown[]
  active: number
  setActive: (n: number) => void
  onActiveSlide: boolean
}> = ({ slides, active, setActive, onActiveSlide }) => {
  const rover = useRoverState({ loop: true, orientation: 'horizontal' })

  return (
    <Group
      className="carousel-indicators"
      css={css`
        ${tw`flex items-center justify-center p-0`}
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
            outline-none
            hover:bg-white
            hover:opacity-100
            focus:shadow-outline
          `}

            outline: 0 !important;
            transition: all 200ms linear;

            :hover {
              transform: scale(1.2);
            }

            ${active === index
              ? tw`bg-white opacity-100`
              : tw`bg-gray-500 opacity-75`}
          `}
          className={active === index ? 'active' : ''}
          {...(!onActiveSlide && { tabIndex: -1 })}
        />
      ))}
    </Group>
  )
}

type SliderArrowProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onActiveSlide: boolean
  ariaLabel: string
  extraCss: SerializedStyles
  icon: React.ReactNode
}

const SliderArrow: React.FC<SliderArrowProps> = ({
  onClick,
  onActiveSlide,
  ariaLabel,
  extraCss,
  icon
}) => {
  return (
    <Button
      tabIndex={onActiveSlide ? 0 : -1}
      onClick={onClick}
      aria-label={ariaLabel}
      className="mt-16 text-white focus:shadow-outline hover:opacity-50 hidden md:block"
      css={css`
        transition: all 200ms linear;
        opacity: ${onActiveSlide ? 1 : 0};

        :focus {
          outline: 0;
        }

        ${extraCss}
      `}
    >
      {icon}
    </Button>
  )
}

const CaseStudiesSlider: React.FC<Props> = ({ data, realtime }) => {
  const { title, caseStudies } = data

  return (
    <Box
      className="block w-full overflow-x-hidden overflow-y-visible relative"
      css={css`
        scroll-snap-type: x mandatory;
      `}
    >
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
          <Box
            className="w-full flex justify-start items-stretch relative"
            {...handlers}
            style={style}
            css={css`
              scroll-snap-align: start;
            `}
          >
            {(slides as CaseStudy[]).map((slide, slideIndex) => {
              const slideImage = get(
                slide,
                realtime
                  ? 'backgroundImage[0].url'
                  : 'backgroundImage[0].localFile.childImageSharp.fluid'
              )
              const slideInner = (
                <Box
                  className="flex flex-col justify-start items-center h-full"
                  css={css`
                    transition: all 350ms ease-out;
                    opacity: ${active === slideIndex - 1 ? 1 : 0};
                  `}
                >
                  <SectionContainer
                    css={css`
                      justify-content: space-between;
                      min-height: 100%;
                    `}
                  >
                    <SectionTitle
                      css={css`
                        ${tw`text-white leading-none`}
                      `}
                    >
                      {title}
                    </SectionTitle>
                    <Box className="w-full flex justify-start items-center flex-grow-0 flex-shrink-0 mb-10">
                      {originalSlides.length > 1 && (
                        <SliderArrow
                          onClick={prev}
                          ariaLabel="previous slide"
                          onActiveSlide={active === slideIndex - 1}
                          icon={<ArrowLeftIcon />}
                          extraCss={css`
                            margin-right: 4rem;
                            transform: ${active === slideIndex - 1
                              ? 'translateX(0)'
                              : 'translateX(1rem)'};
                          `}
                        />
                      )}
                      <Box className="block w-full overflow-x-hidden overflow-y-visible flex-grow flex-shrink">
                        <Box
                          className="carousel-content-wrapper"
                          css={css`
                            ${tw`flex flex-col justify-start items-stretch bg-white`}

                            opacity: 0.96;
                          `}
                        >
                          <Box
                            className="carousel-content"
                            css={css`
                              ${tw`flex justify-start items-stretch relative`}
                            `}
                          >
                            <Box className="flex w-full relative">
                              <Box
                                className="carousel-item"
                                css={css`
                                  ${tw`text-center px-8 pt-15 pb-8 w-full z-10 bg-white relative flex-grow-1`}
                                `}
                              >
                                <Box
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
                                          slide.logo[0].localFile
                                            .childImageSharp.fluid
                                        }
                                      />
                                    </span>
                                  )}
                                  <h3 className="text-2xl sm:text-4xl md:text-5xl text-center leading-snug font-light text-heading mb-4">
                                    {slide.title}
                                  </h3>
                                  <p className="text-sm sm:text-base leading-normal px-4 sm:px-6 md:px-8 mb-8 sm:mb-10">
                                    {slide.excerpt}
                                  </p>
                                  <Box className="flex justify-center items-center">
                                    <Link
                                      tabIndex={
                                        active === slideIndex - 1 ? 0 : -1
                                      }
                                      to={`/case-studies/${slide.slug}`}
                                      className="uppercase mb-10 inline-block font-normal flex justify-center items-center"
                                      css={css`
                                        color: ${get(
                                          slide,
                                          'brandColour',
                                          '#646464'
                                        )};

                                        transition: transform 200ms linear;
                                        transform: scale(1);

                                        :hover {
                                          transform: scale(1.1);
                                        }
                                      `}
                                    >
                                      <span>Learn More</span>
                                      <ArrowRight
                                        css={css`
                                          height: 0.875rem;
                                        `}
                                      />
                                    </Link>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {originalSlides.length > 1 && (
                        <SliderArrow
                          onClick={next}
                          ariaLabel="next slide"
                          onActiveSlide={active === slideIndex - 1}
                          icon={<ArrowRightIcon />}
                          extraCss={css`
                            margin-left: 4rem;
                            transform: ${active === slideIndex - 1
                              ? 'translateX(0)'
                              : 'translateX(-1rem)'};
                          `}
                        />
                      )}
                    </Box>
                    {originalSlides.length > 1 && (
                      <Dots
                        slides={originalSlides}
                        setActive={setActive}
                        active={active}
                        onActiveSlide={active === slideIndex - 1}
                      />
                    )}
                  </SectionContainer>
                </Box>
              )

              return realtime ? (
                <section
                  key={slideIndex}
                  className="w-screen pt-20 pb-20 flex-grow"
                  css={css`
                    background-color: ${get(slide, 'brandColour', '#ff6633')};
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-image: url("${slideImage}");
                  `}
                >
                  {slideInner}
                </section>
              ) : (
                <BackgroundImage
                  key={slideIndex}
                  Tag="section"
                  className="w-screen pt-20 pb-20 flex-grow"
                  fluid={slideImage}
                  backgroundColor={get(slide, 'brandColour', '#ff6633')}
                >
                  {slideInner}
                </BackgroundImage>
              )
            })}
          </Box>
        )}
      </Carousel>
    </Box>
  )
}

export default CaseStudiesSlider
