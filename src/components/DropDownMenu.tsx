import React from 'react'
import { useMenuState, Menu, MenuItem, MenuDisclosure } from 'reakit/Menu'

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
      <Menu {...menu} {...props}>
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
