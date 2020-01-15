import React from 'react'
import get from 'lodash/get'

type Props = {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export type VisibilityObserverPayload = {
  isIntersecting: boolean
  isVisible: boolean
  intersectionRatio: number
  rootBounds: unknown
  boundingClientRect: unknown
}

const getPayloadFromEntry = (
  entry?: IntersectionObserverEntry
): VisibilityObserverPayload => {
  return {
    isIntersecting: get(entry, 'isIntersecting', false),
    isVisible: get(entry, 'isVisible', false),
    intersectionRatio: get(entry, 'intersectionRatio', 0),
    rootBounds: get(entry, 'rootBounds', {}),
    boundingClientRect: get(entry, 'boundingClientRect', {})
  }
}

export const useVisibilityObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  once = false,
  ref
}: Props & { ref: React.MutableRefObject<HTMLElement> }) => {
  const visibilityCount = React.useRef(0)
  const [payload, setPayload] = React.useState(getPayloadFromEntry())

  const options = React.useMemo(() => ({ root, rootMargin, threshold }), [
    root,
    rootMargin,
    threshold
  ])

  const callback = React.useCallback(
    entries => {
      if (once && visibilityCount.current >= 1) {
        return
      }

      const entry = get(entries, [0], {})
      const newPayload = getPayloadFromEntry(entry)
      setPayload(newPayload)

      if (newPayload.isIntersecting) {
        visibilityCount.current++
      }
    },
    [once]
  )

  const observer = React.useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    return new IntersectionObserver(callback, options)
  }, [callback, options])

  React.useEffect(() => {
    const target = ref.current

    if (!observer || !target) return

    observer.observe(target)
    return () => observer.unobserve(target)
  }, [observer, ref])

  return payload
}

const VisibilityObserver: React.FC<Props & { className?: string }> = ({
  root,
  rootMargin,
  threshold,
  once,
  children,
  className = ''
}) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const payload = useVisibilityObserver({
    root,
    rootMargin,
    threshold,
    once,
    ref
  })

  let node

  if (typeof children === 'function') {
    node = children(payload)
  } else {
    if (!React.isValidElement(children)) {
      node = null
    }

    node = React.cloneElement(children as any, payload)
  }

  return (
    <div ref={ref} className={className}>
      {node}
    </div>
  )
}

VisibilityObserver.defaultProps = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
  once: false
}

export default VisibilityObserver
