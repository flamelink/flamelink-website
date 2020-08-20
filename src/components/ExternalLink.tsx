import React from 'react'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
  dataClickLocation?: string
  dataClickText?: string
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, className, dataClickLocation, dataClickText }, ref) => {
    return (
      <a
        ref={ref}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        className={className}
        data-click-type="cta"
        data-click-location={dataClickLocation}
        data-click-text={dataClickText}
      >
        {children}
      </a>
    )
  }
)

export default ExternalLink
