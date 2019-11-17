import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, className }, ref) => {
    return (
      <OutboundLink
        ref={ref}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        className={className}
      >
        {children}
      </OutboundLink>
    )
  }
)

export default ExternalLink
