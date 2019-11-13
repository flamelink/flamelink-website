import React from 'react'

type Props = {
  href: string
  className?: string
}

const ExternalLink: React.FC<Props> = ({ href, children, className }) => {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      className={className}
    >
      {children}
    </a>
  )
}

export default ExternalLink
