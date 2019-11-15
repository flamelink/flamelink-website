import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Link from './external-link'

const ExternalLink = styled(Link)`
  ${tw`font-bold no-underline text-white`}
`

function Footer() {
  return (
    <footer className="bg-gray-800">
      <nav className="flex justify-between max-w-6xl mx-auto p-4 md:p-8 text-sm">
        <p className="text-white">
          Created by{' '}
          <ExternalLink href="https://jperasmus.me">JP Erasmus</ExternalLink>
        </p>

        <p className="text-white">
          <ExternalLink href="https://github.com/jperasmus/flamelink-website">
            GitHub
          </ExternalLink>
        </p>
      </nav>
    </footer>
  )
}

export default Footer
