import React from 'react'
import styled from '@emotion/styled'

const Slider = styled.section`
  height: 35vw;
  width: 100%;
  max-width: 100%;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  margin-bottom: 3.75rem;

  label {
    margin: auto;
    width: 45%;
    height: 100%;
    border-radius: 4px;
    position: absolute;
    left: 0;
    right: 0;
    cursor: pointer;
    transition: transform 400ms ease;
  }

  input[type='radio'] {
    opacity: 0;
  }

  #s1:checked ~ #slide4,
  #s2:checked ~ #slide5,
  #s3:checked ~ #slide1,
  #s4:checked ~ #slide2,
  #s5:checked ~ #slide3 {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    transform: translate3d(-30%, 0, -200px);
  }

  #s1:checked ~ #slide5,
  #s2:checked ~ #slide1,
  #s3:checked ~ #slide2,
  #s4:checked ~ #slide3,
  #s5:checked ~ #slide4 {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(-15%, 0, -100px);
  }

  #s1:checked ~ #slide1,
  #s2:checked ~ #slide2,
  #s3:checked ~ #slide3,
  #s4:checked ~ #slide4,
  #s5:checked ~ #slide5 {
    box-shadow: 0 13px 25px 0 rgba(0, 0, 0, 0.3),
      0 11px 7px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0, 0, 0);
  }

  #s1:checked ~ #slide2,
  #s2:checked ~ #slide3,
  #s3:checked ~ #slide4,
  #s4:checked ~ #slide5,
  #s5:checked ~ #slide1 {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(15%, 0, -100px);
  }

  #s1:checked ~ #slide3,
  #s2:checked ~ #slide4,
  #s3:checked ~ #slide5,
  #s4:checked ~ #slide1,
  #s5:checked ~ #slide2 {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    transform: translate3d(30%, 0, -200px);
  }

  #slide1 {
    background: #00bcd4;
  }
  #slide2 {
    background: #4caf50;
  }
  #slide3 {
    background: #cddc39;
  }
  #slide4 {
    background: #ffc107;
  }
  #slide5 {
    background: #ff5722;
  }
`

const InterfacesSlider = () => {
  return (
    <Slider>
      <input type="radio" name="slider" id="s1" />
      <input type="radio" name="slider" id="s2" />
      <input type="radio" name="slider" id="s3" defaultChecked />
      <input type="radio" name="slider" id="s4" />
      <input type="radio" name="slider" id="s5" />
      <label htmlFor="s1" id="slide1"></label>
      <label htmlFor="s2" id="slide2"></label>
      <label htmlFor="s3" id="slide3"></label>
      <label htmlFor="s4" id="slide4"></label>
      <label htmlFor="s5" id="slide5"></label>
    </Slider>
  )
}

export default InterfacesSlider
