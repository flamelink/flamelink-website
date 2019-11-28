import React from 'react'
import { useMenuState, Menu, MenuItem, MenuDisclosure } from 'reakit/Menu'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface Props {
  disclosure: React.ReactElement
  items: React.ReactElement[]
}

const DropDownMenu: React.FC<Props> = ({ disclosure, items, ...props }) => {
  const menu = useMenuState({
    orientation: 'vertical',
    // TODO: Implement subtle open/close animation
    unstable_animated: true
  })

  return (
    <>
      <MenuDisclosure {...menu} {...disclosure.props}>
        {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
      </MenuDisclosure>
      <Menu
        {...menu}
        {...props}
        css={css`
          ${tw`bg-white`}
        `}
      >
        {items.map((item, i) => (
          <MenuItem {...menu} {...item.props} key={i}>
            {itemProps => React.cloneElement(item, itemProps)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default DropDownMenu
