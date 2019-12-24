import React from 'react'
import { Button } from 'reakit/Button'
import { Group } from 'reakit/Group'
import { Box } from 'reakit/Box'
import { useRoverState, Rover } from 'reakit/Rover'
import get from 'lodash/get'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import Img from 'gatsby-image'
import Carousel from '../components/Carousel'
import ArrowLeftIcon from '../icons/ArrowLeft'
import ArrowRightIcon from '../icons/ArrowRight'

type LocalFile = {
  childImageSharp: any // TODO: improve types
}

type AvatarObj = {
  localFile: LocalFile
}

type Testimonial = {
  name: string
  jobTitle: string
  quote: string
  avatar: AvatarObj[]
}

type Props = {
  testimonials: Testimonial[]
}

const Avatar = ({ localFile }: { localFile: LocalFile }) => {
  return (
    <Box
      css={css`
        ${tw`h-34 flex justify-center items-center absolute z-20`}
        top: -4rem;
        width: calc(100% - 4rem);
      `}
    >
      <span
        css={css`
          ${tw`w-34 h-34 inline-block rounded-full border-white bg-white`}
          border-width: 1rem;
        `}
      >
        {get(localFile, 'childImageSharp.fluid') && (
          <Img fluid={localFile.childImageSharp.fluid} />
        )}
      </span>
    </Box>
  )
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

type SliderArrowProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  ariaLabel: string
  icon: React.ReactNode
}

const SliderArrow: React.FC<SliderArrowProps> = ({
  onClick,
  icon,
  ariaLabel
}) => (
  <Button
    onClick={onClick}
    aria-label={ariaLabel}
    className="mt-16 text-gray-400 hover:text-gray-600 focus:shadow-outline hidden lg:block"
    css={css`
      :focus {
        outline: 0;
      }
    `}
  >
    {icon}
  </Button>
)

const TestimonialsSlider: React.FC<Props> = ({ testimonials }) => {
  if (!testimonials || !testimonials.length) {
    return null
  }

  return (
    <Carousel slides={testimonials} interval={0}>
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
        <Box className="flex justify-start items-center max-w-full w-full">
          {originalSlides.length > 1 && (
            <SliderArrow
              onClick={prev}
              icon={<ArrowLeftIcon />}
              ariaLabel="previous slide"
            />
          )}
          <Box className="carousel-slide-wrapper mt-16 mx-8 lg:mx-16 shadow flex-shrink">
            <Box className="carousel-slide block w-full pt-20 -mt-20 overflow-x-hidden overflow-y-visible">
              <Box
                className="carousel-content-wrapper"
                css={css`
                  ${tw`flex flex-col flex-no-wrap justify-start items-stretch bg-white w-full max-w-full`}

                  opacity: 0.96;
                  scroll-snap-type: x mandatory;
                `}
              >
                <Box
                  className="carousel-content flex justify-start items-stretch relative"
                  {...handlers}
                  style={style}
                  css={css`
                    scroll-snap-align: start;
                  `}
                >
                  {(slides as Testimonial[]).map((slide, index) => (
                    <Box key={index} className="flex w-full relative">
                      <Box
                        className="ghost-avatar"
                        css={css`
                          ${tw`h-34 w-full flex-grow-0 flex justify-center items-center absolute z-0`}
                          top: -4rem;
                        `}
                      >
                        <span
                          css={css`
                            ${tw`w-34 h-34 inline-block rounded-full border-white bg-white shadow`}
                            border-width: 1rem;
                          `}
                        >
                          <span
                            css={css`
                              ${tw`w-34 h-34 inline-block`}
                            `}
                          ></span>
                        </span>
                      </Box>
                      <Box
                        className="carousel-item"
                        css={css`
                          ${tw`text-center px-8 pt-15 pb-8 w-full z-10 bg-white relative flex-grow-1`}
                        `}
                      >
                        {get(slide, 'avatar[0].localFile') && (
                          <Avatar localFile={slide.avatar[0].localFile} />
                        )}
                        <Box
                          css={css`
                            ${tw`flex flex-col justify-center items-stretch h-full`}
                          `}
                        >
                          <blockquote className="mb-10 mt-4 text-lg">
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
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {originalSlides.length > 1 && (
                  <Dots
                    slides={originalSlides}
                    setActive={setActive}
                    active={active}
                  />
                )}
              </Box>
            </Box>
          </Box>
          {originalSlides.length > 1 && (
            <SliderArrow
              onClick={next}
              icon={<ArrowRightIcon />}
              ariaLabel="next slide"
            />
          )}
        </Box>
      )}
    </Carousel>
  )
}

export default TestimonialsSlider
