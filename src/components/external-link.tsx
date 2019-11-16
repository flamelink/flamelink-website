import React from 'react'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, className }, ref) => {
    return (
      <a
        ref={ref}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        className={className}
      >
        {children}
      </a>
    )
  }
)

export default ExternalLink
