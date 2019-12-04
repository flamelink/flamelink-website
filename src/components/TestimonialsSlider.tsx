import React from 'react'
import { Button } from 'reakit/Button'
import { Group } from 'reakit/Group'
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
    <div
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
        <Img fluid={localFile.childImageSharp.fluid} />
      </span>
    </div>
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

const TestimonialsSlider: React.FC<Props> = ({ testimonials }) => {
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
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0">
          <Button
            onClick={prev}
            className="mr-16 mt-16 text-gray-400 hover:text-gray-600 focus:shadow-outline"
            css={css`
              :focus {
                outline: 0;
              }
            `}
          >
            <ArrowLeftIcon />
          </Button>
          <div
            css={css`
              ${tw`mt-16 shadow`}
            `}
          >
            <div className="block w-full pt-20 -mt-20 overflow-x-hidden overflow-y-visible flex-grow flex-shrink">
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
                  {...handlers}
                  style={style}
                >
                  {(slides as Testimonial[]).map((slide, index) => (
                    <div key={index} className="flex w-full relative">
                      <div
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
                      </div>
                      <div
                        className="carousel-item"
                        css={css`
                          ${tw`text-center px-8 pt-15 pb-8 w-full z-10 bg-white relative flex-grow-1`}
                        `}
                      >
                        {get(slide, 'avatar[0].localFile') && (
                          <Avatar localFile={slide.avatar[0].localFile} />
                        )}
                        <div
                          css={css`
                            ${tw`flex flex-col justify-center items-stretch h-full`}
                          `}
                        >
                          <blockquote
                            css={css`
                              ${tw`mb-10 mt-4`}

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
                      </div>
                    </div>
                  ))}
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
          </div>
          <Button
            onClick={next}
            className="ml-16 mt-16 text-gray-400 hover:text-gray-600 focus:shadow-outline"
            css={css`
              :focus {
                outline: 0;
              }
            `}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      )}
    </Carousel>
  )
}

export default TestimonialsSlider
