import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button as ReakitButton } from 'reakit/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import Button from './Button'
import Logo from './Logo'
import ExternalLink from './ExternalLink'
import DropDownMenu from './DropDownMenu'

const MainHeader = styled.header<{ sticky: boolean }>`
  ${tw`top-0 w-screen z-20`}

  ${props =>
    props.sticky
      ? tw`sticky bg-brand`
      : tw`relative`}

  transition: background 350ms linear;
`

const MenuButton = styled(ReakitButton)`
  ${tw`block md:hidden border border-white flex items-center px-3 py-2 rounded text-white cursor-pointer`}
`

const HomeLink = styled(Link)`
  transition: all 290ms ease-out;

  ${tw`no-underline text-white`}
`
const NavLink = styled.button<{ as?: unknown; to?: string }>`
  ${tw`
    block md:inline-block
    m-0
    no-underline
    font-normal
    text-lg
    md:text-base
    lg:text-g
    text-white
    hover:text-brand-dark
  `}

  line-height: 1;
  transition: all 300ms ease-out;

  padding: 0.875rem 0.6rem;

  @media (min-width: 769px) {
    padding: 0.875rem 1rem;
  }

  &[aria-expanded='true'] {
    ${tw`bg-gray-500 hover:text-white hover:underline`}
  }
`

const NavMenuItem = styled.a<{ as?: unknown }>`
  transition: all 300ms ease-out;

  ${tw`block py-1 px-4 no-underline hover:underline font-normal text-white text-base`}
`

type CmsNavItem = {
  cssClass: string
  flamelink_id: string
  title: string
  url: string
  newWindow: boolean
  flamelink_children: CmsNavItem[]
}

const NavigationItem: React.FC<CmsNavItem> = item => {
  const key = item.flamelink_id
  if (!isEmpty(item.flamelink_children)) {
    const menuItems = item.flamelink_children.map(menuItem => (
      <NavMenuItem as={ExternalLink} href={menuItem.url}>
        {menuItem.title}
      </NavMenuItem>
    ))
    return (
      <div key={key}>
        <DropDownMenu
          aria-label={`${item.title} menu`}
          disclosure={<NavLink as={ReakitButton}>{item.title}</NavLink>}
          items={menuItems}
          css={css`
            ${tw`bg-gray-500 text-white py-1 lg:py-3 mt-2`}
          `}
        />
      </div>
    )
  }

  if (item.cssClass === 'button') {
    return (
      <Button
        key={key}
        variant="contained"
        color="secondary"
        href={item.url}
        className="ml-4 mt-4 md:mt-0 inline-block"
        {...(item.newWindow ? { as: ExternalLink } : {})}
      >
        {item.title}
      </Button>
    )
  }

  return (
    <NavLink key={key} as={Link} to={item.url}>
      {item.title}
    </NavLink>
  )
}

function Header() {
  const [isExpanded, toggleExpansion] = React.useState(false)
  const [stickyNav, setStickyNav] = React.useState(false)

  const { site, allFlamelinkHeaderMenuNavigation } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allFlamelinkHeaderMenuNavigation {
        edges {
          node {
            items {
              uuid
              title
              cssClass
              order
              url
              attachment
              parentIndex
              newWindow
              component
              flamelink_id
              flamelink_children {
                uuid
                title
                cssClass
                order
                url
                attachment
                parentIndex
                newWindow
                component
                flamelink_id
              }
            }
          }
        }
      }
    }
  `)

  const navItems: CmsNavItem[] = get(
    allFlamelinkHeaderMenuNavigation,
    'edges.0.node.items',
    []
  )

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isAtTop = currPos.y === 0

      if (isAtTop) {
        if (stickyNav) {
          setStickyNav(false)
        }
      } else {
        const isScrollingUp = currPos.y > prevPos.y

        if (isScrollingUp !== stickyNav) {
          setStickyNav(isScrollingUp)
        }
      }
    },
    [stickyNav],
    undefined,
    false,
    150
  )

  const isSticky = stickyNav || isExpanded

  return (
    <MainHeader sticky={isSticky}>
      <div
        className={`flex flex-wrap items-baseline justify-between max-w-6xl mx-auto p-4 ${
          isSticky ? 'md:p-3' : 'md:p-8'
        }`}
        css={css`
          transition: all 190ms linear;
        `}
      >
        <HomeLink to="/" aria-label={site.siteMetadata.title}>
          <Logo />
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
            isExpanded ? 'flex' : 'hidden md:visible md:block'
          } md:flex flex-col md:flex-row justify-start items-center w-full md:w-auto p-4 md:p-0 mt-4 md:mt-0`}
        >
          {navItems.map(NavigationItem)}
        </nav>
      </div>
    </MainHeader>
  )
}

export default Header
