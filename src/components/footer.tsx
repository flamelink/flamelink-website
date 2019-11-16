import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import ExternalLink from './external-link'

const StripedToe = styled.div`
  height: 1.25rem;
  background-color: transparent;
  background-image: ${props => `repeating-linear-gradient(
    -45deg,
    transparent 0,
    transparent 5px,
    ${props.theme.colors.primary} 5px,
    ${props.theme.colors.primary} 7px
  )`};
`

function Footer() {
  return (
    <footer className="bg-gray-800">
      <nav className="flex justify-between max-w-6xl mx-auto p-4 md:p-8 text-sm text-white">
        <p className="flex flex-col justify-start items-start">
          <span className="font-medium mb-5">Flamelink</span>
          <ExternalLink
            className="font-light"
            href="https://firebasestorage.googleapis.com/v0/b/flamelink-website.appspot.com/o/flamelink%2Fmedia%2F1542263734745_Flamelink%20Terms%20and%20Conditions.pdf?alt=media&token=ce193870-f339-4b07-9af0-d2e2926c7aee"
          >
            Terms &amp; Conditions
          </ExternalLink>
          <ExternalLink
            className="font-light"
            href="https://firebasestorage.googleapis.com/v0/b/flamelink-website.appspot.com/o/flamelink%2Fmedia%2F1542263738168_Flamelink%20Privacy%20Policy.pdf?alt=media&token=ce193870-f339-4b07-9af0-d2e2926c7aee"
          >
            Privacy Policy
          </ExternalLink>
          <Link className="font-light" to="/security">
            Security
          </Link>
        </p>

        <p className="flex flex-col justify-start items-start">
          <h3 className="font-medium mb-5">Support</h3>
          <ExternalLink href="https://intercom.help/flamelink">
            Documentation
          </ExternalLink>
          <ExternalLink href="https://headwayapp.co/flamelink-changelog">
            Changelog
          </ExternalLink>
          <ExternalLink href="https://github.com/flamelink">SDK's</ExternalLink>
          <h3 className="font-medium mb-5 mt-5">Flamelinks</h3>
          <ExternalLink href="https://app.flamelink.io/register">
            Register Today
          </ExternalLink>
        </p>
      </nav>
      <StripedToe />
    </footer>
  )
}

export default Footer
