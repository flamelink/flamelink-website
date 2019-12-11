import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import { Box } from 'reakit/Box'
import { Group } from 'reakit/Group'
import { useRoverState, Rover } from 'reakit/Rover'
import get from 'lodash/get'
import { css } from '@emotion/core'
import ReactHoverObserver from 'react-hover-observer'
import tw from 'tailwind.macro'
import BackgroundImage from 'gatsby-background-image'
import Button from './Button'
import Carousel from './Carousel'
import Modal from './Modal'
import ArrowLeftIcon from '../icons/ArrowLeft'
import ArrowRightIcon from '../icons/ArrowRight'
import { Link } from 'gatsby'

type LocalFile = {
  childImageSharp: any // TODO: improve types
}

type FileObj = {
  localFile: LocalFile
}

type Banner = {
  title1: string
  title2: string
  excerpt: string
  image: FileObj[]
}

type Props = {
  banners: Banner[]
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
              hover:bg-white
              focus:shadow-outline
              p-0
            `}

            outline: 0 !important;
            transition: all 200ms linear;
            ${active === index ? tw`bg-white` : tw`bg-brand-dark`}
            opacity: ${active === index ? 1 : 0.6}

            :hover {
              transform: scale(1.2);
            }
          `}
          className={active === index ? 'active' : ''}
        />
      ))}
    </Group>
  )
}

const HomepageSlider: React.FC<Props> = ({ banners }) => {
  return (
    <ReactHoverObserver hoverDelayInMs={300} hoverOffDelayInMs={300}>
      {({ isHovering }: { isHovering: boolean }) => (
        <Carousel slides={banners} interval={8000} isPaused={isHovering}>
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
              className="w-full h-screen flex justify-start items-stretch relative"
              {...handlers}
              style={{ marginTop: '-7rem', ...style }}
            >
              {(slides as Banner[]).map((slide, index) => (
                <BackgroundImage
                  key={index}
                  Tag="section"
                  className="w-screen bg-brand pt-20 pb-20 w-full"
                  fluid={get(slide, 'image[0].localFile.childImageSharp.fluid')}
                  css={css`
                    background-position: top center;
                    background-repeat: no-repeat;
                    background-size: cover;
                  `}
                >
                  <Box
                    className="flex flex-col flex-1 justify-center items-stretch max-w-6xl mx-auto px-4 md:px-8 w-full h-full relative"
                    style={{ paddingTop: '9rem', paddingBottom: '9rem' }}
                  >
                    <ReakitButton
                      onClick={prev}
                      aria-label="previous slide"
                      className="text-white hover:text-brand-dark focus:shadow-outline absolute"
                      css={css`
                        left: -4rem;
                        top: calc(50% - 1.5rem);
                        transition: all 200ms linear;
                        opacity: ${active === index - 1 ? 1 : 0};
                        transform: ${active === index - 1
                          ? 'translateX(0)'
                          : 'translateX(2rem)'};

                        :focus {
                          outline: 0;
                        }

                        :hover {
                          transform: translateX(-0.25rem) scale(1.1);
                        }
                      `}
                    >
                      <ArrowLeftIcon />
                    </ReakitButton>
                    <Box
                      css={
                        active === index - 1
                          ? css`
                              transition: transform 150ms ease-out,
                                opacity 350ms ease-out;
                              transform: translate(0%);
                              opacity: 1;
                            `
                          : css`
                              transition: transform 50ms ease-in,
                                opacity 150ms ease-in;
                              transform: translate(-10%);
                              opacity: 0;
                            `
                      }
                    >
                      <h1 className="flex flex-col justify-start items-start text-white font-normal leading-none text-5xl mb-8">
                        <span>{slide.title1}</span>
                        <span
                          className="uppercase"
                          css={css`
                            font-size: 3.125rem;
                          `}
                        >
                          {slide.title2}
                        </span>
                      </h1>
                      <p className="text-white text-lg mb-8 max-w-md">
                        {slide.excerpt}
                      </p>
                      <Group>
                        {slide.ctas.map((cta, index) =>
                          cta.action === 'demo-video' ? (
                            <Modal
                              key={index}
                              aria-label="play demo video"
                              disclosure={
                                <Button
                                  variant={cta.buttonType}
                                  color="secondary"
                                >
                                  {cta.text}
                                </Button>
                              }
                            >
                              <video src="https://www.youtube.com/embed/8Cw5ktNADBQ?=controls=0&rel=0&showinfo=0&autoplay=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=en&wmode=transparent&modestbranding=1&disablekb=1&origin=https%3A%2F%2Fflamelink.io&enablejsapi=1&widgetid=4" />
                            </Modal>
                          ) : (
                            <Button
                              key={index}
                              variant={cta.buttonType}
                              color="secondary"
                              as={Link}
                              to={cta.action}
                              style={{ marginRight: '1rem' }}
                            >
                              {cta.text}
                            </Button>
                          )
                        )}
                      </Group>
                    </Box>
                    <ReakitButton
                      onClick={next}
                      aria-label="next slide"
                      className="text-white hover:text-brand-dark focus:shadow-outline absolute"
                      css={css`
                        right: -4rem;
                        top: calc(50% - 1.5rem);
                        transition: all 200ms linear;
                        opacity: ${active === index - 1 ? 1 : 0};
                        transform: ${active === index - 1
                          ? 'translateX(0)'
                          : 'translateX(-2rem)'};

                        :focus {
                          outline: 0;
                        }

                        :hover {
                          transform: translateX(0.25rem) scale(1.1);
                        }
                      `}
                    >
                      <ArrowRightIcon />
                    </ReakitButton>
                  </Box>
                  {originalSlides.length > 1 && (
                    <Dots
                      slides={originalSlides}
                      setActive={setActive}
                      active={active}
                    />
                  )}
                </BackgroundImage>
              ))}
            </Box>
          )}
        </Carousel>
      )}
    </ReactHoverObserver>
  )
}

export default HomepageSlider
