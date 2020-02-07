// Inspiration taken from Dmitriy Panfilov's codepen example: https://codepen.io/panfilov/pen/GogJVy

import React from 'react'
import styled from '@emotion/styled'
import take from 'lodash/take'
import get from 'lodash/get'
import Img, { FluidObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'
import { Section, SectionContainer, SectionTitle } from './Section'
import Button from './Button'
import ExternalLink from './ExternalLink'

const X_OFFSET_PERCENTAGE = '125%'
const DEPTH = '400px'

const Selector = styled.input`
  opacity: 0;
`

const Slide = styled.label`
  margin: auto;
  width: 45%;
  height: auto;
  border-radius: 6px;
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  cursor: pointer;
  transition: transform 500ms ease;

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    padding: 0;
    margin: 0;
  }
`
// https://www.freecodecamp.org/forum/t/perspective-problem-firefox-bug/137639/2
const Slider = styled.div`
  height: 35vw;
  width: 100%;
  max-width: 100%;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  margin-bottom: 2.5rem;

  /* Position: left */
  #s1:checked ~ #slide3,
  #s2:checked ~ #slide1,
  #s3:checked ~ #slide2 {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(-${X_OFFSET_PERCENTAGE}, 0, -${DEPTH});
  }

  /* Position: center */
  #s1:checked ~ #slide1,
  #s2:checked ~ #slide2,
  #s3:checked ~ #slide3 {
    box-shadow: 0 13px 25px 0 rgba(0, 0, 0, 0.3),
      0 11px 7px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0, 0, 0);
    cursor: default;
  }

  /* Position: right */
  #s1:checked ~ #slide2,
  #s2:checked ~ #slide3,
  #s3:checked ~ #slide1 {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(${X_OFFSET_PERCENTAGE}, 0, -${DEPTH});
  }
`

const selectedIndex = 1

export type InterfaceSlide = {
  inputId: string
  slideId: string
  image: FluidObject
}

const InterfacesSlider: React.FC = () => {
  const { flamelinkInterfacesSliderContent } = useStaticQuery(graphql`
    query InterfacesSliderQuery {
      flamelinkInterfacesSliderContent {
        title
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1440, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        cta {
          text
          url
        }
      }
    }
  `)

  // This interface slider only works with 3 slides, so making sure if more is passed that it doesn't break
  const slides = take(
    get(flamelinkInterfacesSliderContent, 'images', []).map(
      (image: unknown, idx: number) => ({
        inputId: `s${idx + 1}`,
        slideId: `slide${idx + 1}`,
        image: get(image, 'localFile.childImageSharp.fluid') as InterfaceSlide
      })
    ),
    3
  ) as InterfaceSlide[]

  if (!slides.length) {
    return null
  }

  return (
    <Section className="bg-gray-100">
      <SectionContainer>
        <SectionTitle>
          {get(flamelinkInterfacesSliderContent, 'title', 'Content Interfaces')}
        </SectionTitle>
      </SectionContainer>
      <Slider>
        {/* NB! All input selectors have to be listed before the slide labels for sibling selector to work */}
        {slides.map((slide, slideIndex) => (
          <Selector
            key={slide.inputId}
            type="radio"
            name="slider"
            id={slide.inputId}
            aria-label={`selector for ${slide.slideId}`}
            defaultChecked={slideIndex === selectedIndex}
          />
        ))}
        {slides.map(slide => (
          <Slide key={slide.slideId} htmlFor={slide.inputId} id={slide.slideId}>
            {slide.image ? (
              <Img fluid={slide.image} alt="Flamelink interface" />
            ) : null}
          </Slide>
        ))}
      </Slider>
      <Button
        variant="contained"
        color="primary"
        as={ExternalLink}
        href={get(flamelinkInterfacesSliderContent, 'cta.url', '#')}
      >
        {get(flamelinkInterfacesSliderContent, 'cta.text', 'Get Started')}
      </Button>
    </Section>
  )
}

export default InterfacesSlider
