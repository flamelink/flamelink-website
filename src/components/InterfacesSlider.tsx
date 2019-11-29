import React from 'react'
import styled from '@emotion/styled'
import slideImage1 from '../images/group-24.png'
import slideImage2 from '../images/group-24@2x.png'
import slideImage3 from '../images/group-24@3x.png'

const X_OFFSET_PERCENTAGE = '130%'
const DEPTH = '400px'

const Selector = styled.input`
  opacity: 0;
`

const Slide = styled.label`
  margin: auto;
  width: 45%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  cursor: pointer;
  transition: transform 500ms ease;

  picture,
  source,
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    padding: 0;
    margin: 0;
  }
`

const Slider = styled.div`
  height: 35vw;
  width: 100%;
  max-width: 100%;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  margin-bottom: 3.75rem;

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
  }

  /* Position: right */
  #s1:checked ~ #slide2,
  #s2:checked ~ #slide3,
  #s3:checked ~ #slide1 {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(${X_OFFSET_PERCENTAGE}, 0, -${DEPTH});
  }
`

const slides = [
  {
    inputId: 's1',
    slideId: 'slide1',
    bgColor: '#00bcd4' // blue
  },
  {
    inputId: 's2',
    slideId: 'slide2',
    bgColor: '#cddc39' // green
  },
  {
    inputId: 's3',
    slideId: 'slide3',
    bgColor: '#ff5722' // red
  }
]

const selectedIndex = 1

const InterfacesSlider = () => {
  return (
    <Slider>
      {/* NB! All input selectors have to be listed before the slide labels for sibling selector to work */}
      {slides.map((slide, slideIndex) => (
        <Selector
          type="radio"
          name="slider"
          id={slide.inputId}
          defaultChecked={slideIndex === selectedIndex}
        />
      ))}
      {slides.map(slide => (
        <Slide
          htmlFor={slide.inputId}
          id={slide.slideId}
          style={{ backgroundColor: slide.bgColor }}
        >
          <picture>
            <source
              srcSet={`${slideImage1} 680px, ${slideImage2} 2x, ${slideImage3} 3x`}
            />
            <img src={slideImage1} alt="" />
          </picture>
        </Slide>
      ))}
    </Slider>
  )
}

export default InterfacesSlider
