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

const MainHeader = tw.header`
  bg-brand top-0 w-screen
`

const MenuButton = styled(ReakitButton)`
  ${tw`block md:hidden border border-white flex items-center px-3 py-2 rounded text-white cursor-pointer`}
`

const HomeLink = styled(Link)`
  transition: all 300ms ease-out;

  ${tw`no-underline text-white hover:text-brand-dark`}
`
const NavLink = styled.button`
  transition: all 300ms ease-out;

  ${tw`block md:inline-block mt-4 md:mt-0 md:mr-6 no-underline font-light text-white hover:text-brand-dark`}
`

const NavMenuItem = styled.a`
  transition: all 300ms ease-out;

  ${tw`block py-2 md:mr-6 no-underline font-light text-white hover:text-brand-dark`}
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
      <DropDownMenu
        key={key}
        aria-label={`${item.title} menu`}
        disclosure={<NavLink as={ReakitButton}>{item.title}</NavLink>}
        items={menuItems}
      />
    )
  }

  if (item.cssClass === 'button') {
    return (
      <Button
        key={key}
        variant="contained"
        color="secondary"
        href={item.url}
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
    200
  )

  return (
    <MainHeader
      css={css`
        ${stickyNav ? tw`sticky` : tw`relative`}
      `}
    >
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto p-4 md:p-8">
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
            isExpanded ? 'block' : 'hidden'
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {navItems.map(NavigationItem)}
        </nav>
      </div>
    </MainHeader>
  )
}

export default Header
