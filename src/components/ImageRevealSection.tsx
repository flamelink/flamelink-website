import React from 'react'
import { Box } from 'reakit/Box'
import { css } from '@emotion/core'
import get from 'lodash/get'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import BackgroundImage from 'gatsby-background-image'
import {
  useVisibilityObserver,
  VisibilityObserverPayload
} from './VisibilityObserver'
import { SectionContainer, SectionTitle } from './Section'
import { PageContent } from './PageContent'

type childMarkdownRemark = {
  html: string
}

type HtmlContent = {
  childMarkdownRemark: childMarkdownRemark
}

type Props = {
  iconUrl?: string
  heading: string
  content: string | HtmlContent
  bg: 'white' | 'gray'
  imagePosition?: 'left' | 'right' | 'fullWidth'
  imageYOverlap?: string
  fluidImage?: any // TODO: fix
}

const ImageContainer = styled(Box)<{
  ['data-in-viewport']?: boolean
  ['data-image-position']: Props['imagePosition']
  ['data-image-y-overlap']: Props['imageYOverlap']
}>`
  position: absolute;
  display: ${props =>
    get(props, 'theme.device.sizes.mdUp', false) ? 'inline-block' : 'none'};
  z-index: 20;
  width: 42.15277778%;
  border-radius: 0.25rem;
  overflow: hidden;
  ${props => css`
    top: -${props['data-image-y-overlap'] || '0rem'};
    bottom: -${props['data-image-y-overlap'] || '0rem'};
    height: calc(
      100% + ${props['data-image-y-overlap'] || '0rem'} +
        ${props['data-image-y-overlap'] || '0rem'}
    ) !important;
  `}
  ${props => props['data-image-position']}: -1rem;
  ${props =>
    props['data-in-viewport'] ||
    get(props, 'theme.device.prefersReducedMotion', false)
      ? css`
          transition: transform 250ms ease-out;
          transform: translateX(0%);
        `
      : css`
          transition: transform 200ms ease-in;
          transform: translateX(
            ${props['data-image-position'] === 'right' ? '100%' : '-100%'}
          );
        `}
`

const StyledBackgroundImage = styled(BackgroundImage)`
  height: 100%;
  width: 100%;
`

const ImageRevealSection: React.FC<Props> = ({
  iconUrl,
  heading,
  content,
  bg,
  fluidImage,
  imagePosition,
  imageYOverlap
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
    <Box
      ref={containerRef}
      className="relative w-full h-auto"
      css={css`
        scroll-snap-align: start;
      `}
    >
      {get(fluidImage, 'childImageSharp.fluid') && (
        <ImageContainer
          data-in-viewport={containerInViewport}
          data-image-position={imagePosition}
          data-image-y-overlap={imageYOverlap}
        >
          <StyledBackgroundImage
            fluid={fluidImage.childImageSharp.fluid}
            style={{
              backgroundPosition: `top ${
                imagePosition === 'right' ? 'left' : 'right'
              }`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />
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
            py-15 md:py-32
          `}

          ${bg === 'white' ? tw`bg-white` : tw`bg-gray-100`}
        `}
      >
        <SectionContainer
          css={props => css`
            ${containerInViewport ||
            get(props, 'device.prefersReducedMotion', false)
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
          <Box
            css={css`
              ${imagePosition === 'fullWidth' ? '' : tw`md:w-1/2`}
            `}
            className="w-full relative"
          >
            <header className="flex justify-start items-center w-full mb-5">
              {iconUrl && (
                <span className="w-8 h-8 mr-2">
                  <img
                    src={iconUrl}
                    alt=""
                    loading="lazy"
                    width="32"
                    height="32"
                  />
                </span>
              )}
              <SectionTitle
                css={css`
                  ${tw`text-left mb-0`}
                `}
              >
                {heading}
              </SectionTitle>
            </header>
            <PageContent
              css={css`
                ${tw`mx-0 sm:mx-0`}
              `}
              dangerouslySetInnerHTML={{
                __html: get(content, 'childMarkdownRemark.html', content)
              }}
            />
          </Box>
        </SectionContainer>
      </section>
    </Box>
  )
}

ImageRevealSection.defaultProps = {
  iconUrl: '',
  heading: '',
  content: '',
  bg: 'white',
  fluidImage: null,
  imagePosition: 'right',
  imageYOverlap: '0rem'
}

export default ImageRevealSection
