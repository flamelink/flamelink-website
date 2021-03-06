import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import isEmpty from 'lodash/isEmpty'
import { Button as BaseButton } from 'reakit/Button'
import { Box } from 'reakit/Box'
import Button from '../Button'
import ExternalLink from '../ExternalLink'
import DropDownMenu from '../DropDownMenu'

export type CmsNavItem = {
  cssClass: string
  flamelink_id: string
  title: string
  url: string
  newWindow: boolean
  flamelink_children: CmsNavItem[]
  changeCount?: number
}

const NavLink = styled.button<{
  as?: unknown
  to?: string
  activeClassName?: string
  partiallyActive?: boolean
}>`
  ${tw`
    relative
    block md:inline-block
    m-0
    no-underline
    font-normal
    text-lg
    md:text-sm
    lg:text-base
    text-white
    hover:text-brand
  `}

  line-height: 1;
  transition: all 300ms ease-out;
  padding: 0.875rem 0.6rem;

  :after {
    transition: all 450ms ease-out;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 1px;
    content: '.';
    color: transparent;
    background: #fff;
    visibility: none;
    opacity: 0;
    z-index: -1;
  }

  :hover:after {
    opacity: 1;
    visibility: visible;
    height: 100%;
  }

  @media (min-width: 840px) {
    padding: 0.875rem 1rem;
  }

  &[aria-expanded='true'] {
    ${tw`bg-brand-dark md:bg-gray-500 hover:text-white hover:underline`}
  }

  &.active {
    text-decoration: underline;
    text-decoration-skip: object;
    text-decoration-skip-ink: auto;
    /* Only Firefox support for now */
    text-decoration-thickness: 1px;
    text-underline-offset: 0.35rem;
  }
`

const NavMenuItem = styled.a<{ as?: unknown }>`
  transition: all 300ms ease-out;

  ${tw`block py-2 md:py-1 px-4 no-underline hover:underline font-normal text-white text-base`}
`

const handleGTMClick = (menuName: string) => {
  window.dataLayer.push({
    event: 'e_menuNav',
    menuType: 'header',
    menuName
  })
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
      <Box key={key} className="inline-block">
        <DropDownMenu
          key={item.changeCount || 0}
          aria-label={`${item.title} menu`}
          disclosure={<NavLink as={BaseButton}>{item.title}</NavLink>}
          items={menuItems}
          css={css`
            ${tw`bg-brand-dark md:bg-gray-500 text-white py-1 lg:py-3 mt-2`}
          `}
        />
      </Box>
    )
  }

  if (item.cssClass === 'button') {
    return (
      <Button
        dataClickLocation="header"
        dataClickText={item.title}
        key={key}
        variant="contained"
        color="secondary"
        href={item.url}
        className="md:ml-4 mt-4 md:mt-0 inline-block"
        {...(item.newWindow ? { as: ExternalLink } : {})}
      >
        {item.title}
      </Button>
    )
  }

  return (
    <NavLink
      key={key}
      as={item.newWindow ? ExternalLink : Link}
      {...(item.newWindow ? { href: item.url } : { to: item.url })}
      activeClassName="active"
      partiallyActive
      onClick={() => handleGTMClick(item.title)}
    >
      {item.title}
    </NavLink>
  )
}

export default NavigationItem
