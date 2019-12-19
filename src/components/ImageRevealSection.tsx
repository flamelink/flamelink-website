import React from 'react'
import { Box } from 'reakit/Box'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import BackgroundImage from 'gatsby-background-image'
import {
  useVisibilityObserver,
  VisibilityObserverPayload
} from './VisibilityObserver'
import { SectionContainer, SectionTitle } from './Section'

type Props = {
  heading: string
  content: string
  bg: 'white' | 'gray'
  imagePosition: 'left' | 'right'
  fluidImage: any // TODO: fix
}

const ImageContainer = styled(Box)<{
  inViewport?: boolean
  imagePosition: Props['imagePosition']
}>`
  position: absolute;
  display: inline-block;
  top: -2.5rem;
  bottom: -2.5rem;
  z-index: 20;
  width: 42.15277778%;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  overflow: hidden;
  height: calc(100% + 5rem) !important;
  ${props => props.imagePosition}: -1rem;
  ${props =>
    props.inViewport
      ? css`
          transition: transform 250ms ease-out;
          transform: translateX(0%);
        `
      : css`
          transition: transform 200ms ease-in;
          transform: translateX(
            ${props.imagePosition === 'right' ? '100%' : '-100%'}
          );
        `}
`

const StyledBackgroundImage = styled(BackgroundImage)`
  height: 100%;
  width: 100%;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
`

const ImageRevealSection: React.FC<Props> = ({
  heading,
  content,
  bg,
  fluidImage,
  imagePosition
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null!)
  const {
    isIntersecting: containerInViewport
  }: VisibilityObserverPayload = useVisibilityObserver({
    threshold: 0.5,
    ref: containerRef,
    once: true
  })

  return (
    <Box ref={containerRef} className="relative w-full h-auto">
      {fluidImage && (
        <ImageContainer
          inViewport={containerInViewport}
          imagePosition={imagePosition}
        >
          <StyledBackgroundImage fluid={fluidImage.childImageSharp.fluid} />
        </ImageContainer>
      )}
      <section
        css={css`
          ${tw`
          w-full
          h-auto
          flex flex-col
          justify-start
          items-center
          overflow-x-hidden
          overflow-y-visible
          relative
          py-32
          ${bg === 'white' ? 'bg-white' : 'bg-gray-100'}
        `}

          scroll-snap-align: start;
        `}
      >
        <SectionContainer
          css={css`
            ${containerInViewport
              ? css`
                  transition: opacity 350ms linear, transform 250ms ease-out;
                  opacity: 1;
                  transform: translateX(0%);
                `
              : css`
                  transition: opacity 300ms linear, transform 200ms ease-in;
                  opacity: 0.1;
                  transform: translateX(
                    ${imagePosition === 'right' ? '-10%' : '10%'}
                  );
                `}
            ${fluidImage && imagePosition === 'left'
              ? css`
                  flex-direction: row;
                  justify-content: flex-end;
                `
              : css`
                  flex-direction: row;
                  justify-content: flex-start;
                `}
          `}
          className="relative flex-grow-0 flex-shrink-0 mx-8"
        >
          <Box className="w-1/2 relative">
            <SectionTitle
              css={css`
                ${tw`text-left mb-5`}
              `}
            >
              {heading}
            </SectionTitle>
            <p>{content}</p>
          </Box>
        </SectionContainer>
      </section>
    </Box>
  )
}

ImageRevealSection.defaultProps = {
  heading: '',
  content: '',
  bg: 'white',
  fluidImage: null,
  imagePosition: 'right'
}

export default ImageRevealSection
