import React from 'react'
import isFunction from 'lodash/isFunction'
import { SwipeableHandlers } from 'react-swipeable'
import { useCarousel } from './useSwipeableCarousel'

type CarouselPayload = {
  originalSlides: unknown[]
  slides: unknown[]
  active: number
  setActive: (n: number) => void
  prev: () => void
  next: () => void
  handlers: SwipeableHandlers
  style: React.CSSProperties
}

type CarouselProps = {
  slides: unknown[]
  interval?: number
  isPaused?: boolean
  trackMouse?: boolean
  trackTouch?: boolean
  children: (payload: CarouselPayload) => {}
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  interval = 5000,
  isPaused = false,
  trackMouse = false,
  trackTouch = true,
  children
}) => {
  const size = slides.length
  const { active, setActive, handlers, style, prev, next } = useCarousel({
    size,
    interval,
    isPaused,
    trackMouse,
    trackTouch
  })
  const clonedSlides = slides.slice()

  if (size) {
    // Add necessary wrapping slides before and after the original slides
    clonedSlides.push(slides[0])
    clonedSlides.unshift(slides[size - 1])
  }

  return (
    <>
      {isFunction(children)
        ? children({
            originalSlides: slides,
            slides: clonedSlides,
            active,
            setActive,
            handlers,
            style,
            prev,
            next
          })
        : children}
    </>
  )
}

export default Carousel
