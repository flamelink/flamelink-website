import React from 'react'
import { Link } from 'gatsby'
import { Box } from 'reakit/Box'
import { css } from '@emotion/core'
import get from 'lodash/get'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import {
  useVisibilityObserver,
  VisibilityObserverPayload
} from './VisibilityObserver'
import { SectionContainer, SectionTitle } from './Section'
import ArrowRight from '../icons/ArrowRight'

type Props = {
  title: string
  slug: string
  excerpt: string
  logo: any
  imagePosition: 'left' | 'right'
  backgroundImage?: any // TODO: fix
  brandColour: string
}

const ImageContainer = styled(Box)<{
  ['data-in-viewport']?: boolean
  ['data-image-position']: Props['imagePosition']
}>`
  position: absolute;
  display: inline-block;
  z-index: 20;
  width: 55.5556%;
  border-radius: 0.25rem;
  overflow: hidden;
  ${props => css`
    top: -0rem;
    bottom: -0rem;
    height: calc(100% + 0rem + 0rem) !important;
  `}
  ${props => props['data-image-position']}: -1rem;
  ${props =>
    props['data-in-viewport']
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

const StyledBackgroundImage = styled(BackgroundImage)<{
  ['data-image-position']: Props['imagePosition']
}>`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  ${props =>
    css`
      background-position: top
        ${props['data-image-position'] === 'right' ? 'left' : 'right'} !important;
    `}
`

const CaseStudyRevealItem: React.FC<Props> = ({
  slug,
  title,
  excerpt,
  brandColour,
  imagePosition,
  backgroundImage,
  logo
}) => {
  const containerRef = React.useRef<HTMLLIElement>(null!)
  const {
    isIntersecting: containerInViewport
  }: VisibilityObserverPayload = useVisibilityObserver({
    threshold: 0.5,
    ref: containerRef,
    once: true
  })

  return (
    <Box
      as="li"
      ref={containerRef}
      className="relative w-full h-auto"
      css={css`
        scroll-snap-align: start;
      `}
    >
      {get(backgroundImage, '[0].localFile.childImageSharp.fluid') && (
        <ImageContainer
          data-in-viewport={containerInViewport}
          data-image-position={imagePosition}
        >
          <StyledBackgroundImage
            fluid={backgroundImage[0].localFile.childImageSharp.fluid}
            data-image-position={imagePosition}
          />
        </ImageContainer>
      )}
      <Box
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
            bg-white
          `}
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
            ${backgroundImage && imagePosition === 'left'
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
          <Box className="max-w-sm relative shadow bg-white rounded p-10">
            <header className="flex justify-start items-center w-full mb-8">
              {get(logo, '[0].localFile.childImageSharp.fluid') ? (
                <span className="block w-1/2 mb-0">
                  <Img fluid={logo[0].localFile.childImageSharp.fluid} />
                </span>
              ) : (
                <SectionTitle
                  css={css`
                    ${tw`text-left mb-0`}
                  `}
                >
                  {title}
                </SectionTitle>
              )}
            </header>
            <p className="text-body text-base mb-6">{excerpt}</p>
            <Box className="flex justify-start">
              <Link
                to={`/case-studies/${slug}`}
                className="uppercase mb-0 inline-block font-normal flex justify-center items-center"
                css={css`
                  color: ${brandColour};

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
        </SectionContainer>
      </Box>
    </Box>
  )
}

CaseStudyRevealItem.defaultProps = {
  slug: '',
  title: '',
  excerpt: '',
  logo: null,
  backgroundImage: null,
  brandColour: '#646464'
}

export default CaseStudyRevealItem
