import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Button } from 'reakit/Button'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import ExternalLink from './external-link'
import { FLAMELINK_APP_URL } from '../constants'

const MainHeader = tw.header`
  bg-brand-primary relative top-0 w-screen
`

const MenuButton = styled(Button)`
  ${tw`block md:hidden border border-white flex items-center px-3 py-2 rounded text-white cursor-pointer`}
`

const HomeLink = styled(Link)`
  ${tw`flex items-center no-underline text-white`}
`
const NavLink = styled(Link)`
  ${tw`block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-white`}
`

const GetStarted = styled(ExternalLink)`
  ${tw`text-brand-primary bg-white py-3 px-4 mt-4 md:mt-0 md:ml-6 text-base font-medium uppercase`}
`

function Header() {
  const [isExpanded, toggleExpansion] = React.useState(false)

  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <MainHeader>
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto p-4 md:p-8">
        <HomeLink to="/">
          <svg
            className="fill-current h-8 mr-2 w-8"
            height="54"
            viewBox="0 0 54 54"
            width="54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-bold text-xl tracking-tight">
            {site.siteMetadata.title}
          </span>
        </HomeLink>

        <MenuButton onClick={() => toggleExpansion(!isExpanded)}>
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </MenuButton>

        <nav
          className={`${
            isExpanded ? 'block' : 'hidden'
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: '/features',
              title: 'Features'
            },
            {
              route: '/pricing',
              title: 'Pricing'
            },
            {
              route: '/case-studies',
              title: 'Case Studies'
            },
            {
              route: '/documentation',
              title: 'Documentation'
            }
          ].map(link => (
            <NavLink key={link.title} to={link.route}>
              {link.title}
            </NavLink>
          ))}
          <GetStarted href={FLAMELINK_APP_URL}>Get Started</GetStarted>
        </nav>
      </div>
    </MainHeader>
  )
}

export default Header
