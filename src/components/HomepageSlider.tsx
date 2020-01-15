import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import { Box } from 'reakit/Box'
import { Group } from 'reakit/Group'
import { useRoverState, Rover } from 'reakit/Rover'
import get from 'lodash/get'
import { css, SerializedStyles } from '@emotion/core'
import { IoIosPlay as PlayIcon } from 'react-icons/io'
import ReactHoverObserver from 'react-hover-observer'
import tw from 'tailwind.macro'
import BackgroundImage from 'gatsby-background-image'
import Button from './Button'
import Carousel from './Carousel'
import Modal from './Modal'
import DemoVideo from './DemoVideo'
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
  onActiveSlide: boolean
}> = ({ slides, active, setActive, onActiveSlide }) => {
  const rover = useRoverState({ loop: true, orientation: 'horizontal' })

  return (
    <Group
      className="carousel-indicators"
      css={css`
        ${tw`flex items-center justify-center pb-15 pt-1 relative`}
        z-index: 1;
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

            ${active === index
              ? tw`bg-white`
              : tw`bg-brand-dark`}

            outline: 0 !important;
            transition: all 200ms linear;

            :hover {
              transform: scale(1.2);
            }
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
    <ReakitButton
      tabIndex={onActiveSlide ? 0 : -1}
      onClick={onClick}
      aria-label={ariaLabel}
      className="text-white hover:text-brand-dark focus:shadow-outline absolute hidden lg:inline-block"
      css={css`
        top: calc(50% - 1.5rem);
        transition: all 200ms linear;
        opacity: ${onActiveSlide ? 1 : 0};

        :focus {
          outline: 0;
        }

        ${extraCss}
      `}
    >
      {icon}
    </ReakitButton>
  )
}

const HomepageSlider: React.FC<Props> = ({ banners }) => {
  return (
    <ReactHoverObserver hoverDelayInMs={300} hoverOffDelayInMs={300}>
      {({ isHovering }: { isHovering: boolean }) => (
        <Box
          as="section"
          className="w-full overflow-x-hidden overflow-y-visible block relative"
          css={css`
            margin-top: -7rem;
            scroll-snap-type: x mandatory;
          `}
        >
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
                className="h-screen md:h-auto flex flex-no-wrap justify-start items-stretch relative"
                style={style}
                {...handlers}
                css={css`
                  scroll-snap-align: start;
                `}
              >
                {(slides as Banner[]).map((slide, index) => (
                  <BackgroundImage
                    key={index}
                    Tag="div"
                    className="w-screen bg-brand pt-20 pb-20 w-full relative"
                    fluid={get(
                      slide,
                      'image[0].localFile.childImageSharp.fluid'
                    )}
                    style={{
                      backgroundPosition: 'top center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover'
                    }}
                  >
                    <Box
                      css={css`
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                        opacity: 0.875;
                        background: rgb(224, 87, 41);
                        background: linear-gradient(
                          90deg,
                          rgba(224, 87, 41, 1) 10%,
                          rgba(255, 102, 51, 1) 75%
                        );
                        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e05729",endColorstr="#ff6633",GradientType=1);
                      `}
                    ></Box>
                    <Box
                      className="flex flex-col flex-1 justify-center items-stretch max-w-6xl mx-auto px-4 md:px-8 w-full h-full relative"
                      css={css`
                        padding-top: 9rem;
                        padding-bottom: 9rem;
                        z-index: 1;
                      `}
                    >
                      <SliderArrow
                        onClick={prev}
                        ariaLabel="previous slide"
                        onActiveSlide={active === index - 1}
                        icon={<ArrowLeftIcon />}
                        extraCss={css`
                          left: -4rem;
                          transform: ${active === index - 1
                            ? 'translateX(0)'
                            : 'translateX(2rem)'};
                        `}
                      />
                      <Box
                        css={
                          active === index - 1
                            ? css`
                                transition: transform 150ms ease-out,
                                  opacity 350ms ease-out;
                                opacity: 1;
                                transform: translate(0%);
                              `
                            : css`
                                transition: transform 50ms ease-in,
                                  opacity 150ms ease-in;
                                opacity: 0;
                                transform: translate(0%, 15%);

                                @media (min-width: 768px) {
                                  transform: translate(-10%);
                                }
                              `
                        }
                      >
                        <h1 className="flex flex-col justify-start items-start text-white font-normal leading-none text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-8">
                          <span>{slide.title1}</span>
                          <span
                            className="uppercase"
                            css={css`
                              font-size: 2.5rem;
                              word-break: break-all;

                              @media (min-width: 768px) {
                                font-size: 3.125rem;
                              }
                            `}
                          >
                            {slide.title2}
                          </span>
                        </h1>
                        <p className="text-white text-base sm:text-lg mb-8 max-w-full md:max-w-md">
                          {slide.excerpt}
                        </p>
                        <Group className="flex flex-col md:flex-row flex-no-wrap justify-start items-start">
                          {slide.ctas.map((cta, ctaIndex) =>
                            cta.action === 'demo-video' ? (
                              <Modal
                                key={ctaIndex}
                                aria-label="play demo video"
                                className="bg-white"
                                tabIndex={-1}
                                disclosure={
                                  <Button
                                    variant={cta.buttonType}
                                    color="secondary"
                                    className="mb-4 md:mr-4"
                                    icon={<PlayIcon />}
                                    tabIndex={active === index - 1 ? 0 : -1}
                                  >
                                    {cta.text}
                                  </Button>
                                }
                              >
                                <DemoVideo />
                              </Modal>
                            ) : (
                              <Button
                                key={ctaIndex}
                                variant={cta.buttonType}
                                color="secondary"
                                as={Link}
                                to={cta.action}
                                className="mb-4 md:mr-4"
                                css={props => css`
                                  ${!props.device.sizes.smUp &&
                                    css`
                                      min-width: 10.75rem;
                                    `}
                                `}
                                tabIndex={active === index - 1 ? 0 : -1}
                              >
                                {cta.text}
                              </Button>
                            )
                          )}
                        </Group>
                      </Box>
                      <SliderArrow
                        onClick={next}
                        ariaLabel="next slide"
                        onActiveSlide={active === index - 1}
                        icon={<ArrowRightIcon />}
                        extraCss={css`
                          right: -4rem;
                          transform: ${active === index - 1
                            ? 'translateX(0)'
                            : 'translateX(-2rem)'};
                        `}
                      />
                    </Box>
                    {originalSlides.length > 1 && (
                      <Dots
                        slides={originalSlides}
                        setActive={setActive}
                        active={active}
                        onActiveSlide={active === index - 1}
                      />
                    )}
                  </BackgroundImage>
                ))}
              </Box>
            )}
          </Carousel>
        </Box>
      )}
    </ReactHoverObserver>
  )
}

export default HomepageSlider
