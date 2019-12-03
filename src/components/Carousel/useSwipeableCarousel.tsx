// Slightly adapted version as the one found here: https://gist.github.com/FlorianRappl/fee731eea985d983fc48d10c648ecb17

import { useReducer, useEffect } from 'react'
import { useSwipeable, SwipeableHandlers, EventData } from 'react-swipeable'

function previous(size: number, current: number) {
  return (current - 1 + size) % size
}

function next(size: number, current: number) {
  return (current + 1) % size
}

function threshold(target: EventTarget | null) {
  const width = (target as HTMLElement).clientWidth
  return width / 5
}

const transitionTime = 400
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
const smooth = `transform ${transitionTime}ms ease-out`

interface CarouselState {
  offset: number
  desired: number
  active: number
}

const initialCarouselState: CarouselState = {
  offset: 0,
  desired: 0,
  active: 0
}

interface CarouselNextAction {
  type: 'next'
  size: number
}

interface CarouselPrevAction {
  type: 'prev'
  size: number
}

interface CarouselJumpAction {
  type: 'jump'
  desired: number
}

interface CarouselDoneAction {
  type: 'done'
}

interface CarouselDragAction {
  type: 'drag'
  offset: number
}

type CarouselAction =
  | CarouselJumpAction
  | CarouselNextAction
  | CarouselPrevAction
  | CarouselDragAction
  | CarouselDoneAction

function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  switch (action.type) {
    case 'jump':
      return {
        ...state,
        desired: action.desired
      }
    case 'next':
      return {
        ...state,
        desired: next(action.size, state.active)
      }
    case 'prev':
      return {
        ...state,
        desired: previous(action.size, state.active)
      }
    case 'done':
      return {
        ...state,
        offset: NaN,
        active: state.desired
      }
    case 'drag':
      return {
        ...state,
        offset: action.offset
      }
    default:
      return state
  }
}

function swiped(
  eventData: EventData,
  dispatch: React.Dispatch<CarouselAction>,
  size: number,
  dir: 1 | -1
) {
  const t = threshold(eventData.event.target)
  const d = dir * eventData.deltaX

  if (d >= t) {
    dispatch({
      type: dir > 0 ? 'next' : 'prev',
      size
    })
  } else {
    dispatch({
      type: 'drag',
      offset: 0
    })
  }
}

type UseCarouselConfig = {
  size: number
  interval: number
  trackMouse?: boolean
  trackTouch?: boolean
}

type UseCarouselPayload = {
  active: number
  setActive: (n: number) => void
  next: () => void
  prev: () => void
  handlers: SwipeableHandlers
  style: React.CSSProperties
}

export function useCarousel({
  size,
  interval,
  trackMouse = true,
  trackTouch = true
}: UseCarouselConfig): UseCarouselPayload {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState)
  const handlers = useSwipeable({
    onSwiping(e: EventData) {
      dispatch({
        type: 'drag',
        offset: -e.deltaX
      })
    },
    onSwipedLeft(e: EventData) {
      swiped(e, dispatch, size, 1)
    },
    onSwipedRight(e: EventData) {
      swiped(e, dispatch, size, -1)
    },
    trackMouse,
    trackTouch
  })

  // Carousel auto-scroll behaviour
  useEffect(() => {
    if (!interval) return

    const id = setTimeout(() => dispatch({ type: 'next', size }), interval)
    return () => clearTimeout(id)
  }, [state.offset, state.active, interval, size])

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime)
    return () => clearTimeout(id)
  }, [state.desired])

  const style: React.CSSProperties = {
    transform: 'translateX(0)',
    width: `${100 * (size + 2)}%`,
    left: `-${(state.active + 1) * 100}%`
  }

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired)
    const pref = Math.sign(state.offset || 0)
    const dir =
      (dist > size / 2 ? 1 : -1) * Math.sign(state.desired - state.active)
    const shift = (100 * (pref || dir)) / (size + 2)
    style.transition = smooth
    style.transform = `translateX(${shift}%)`
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${state.offset}px)`
    } else {
      style.transition = elastic
    }
  }

  return {
    active: state.active,
    setActive: n => dispatch({ type: 'jump', desired: n }),
    handlers,
    style,
    next: () => dispatch({ type: 'next', size }),
    prev: () => dispatch({ type: 'prev', size })
  }
}
