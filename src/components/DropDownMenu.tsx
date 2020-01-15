import React from 'react'
import { useMenuState, Menu, MenuItem, MenuDisclosure } from 'reakit/Menu'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from '../hooks/media-queries'
import { twConfig } from '../hooks/theme'

interface Props {
  disclosure: React.ReactElement
  items: React.ReactElement[]
}

const DropDownMenu: React.FC<Props> = ({ disclosure, items, ...props }) => {
  const isDesktop = useMediaQuery(`(min-width: ${twConfig.theme.screens.md})`)
  const menu = useMenuState({
    orientation: 'vertical',
    placement: isDesktop ? 'auto-start' : 'bottom',
    unstable_animated: true
  })
  const { opacity, scale } = useSpring({
    opacity: menu.visible ? 1 : 0,
    scale: menu.visible ? 1 : 0,
    onRest: menu.unstable_stopAnimation,
    config: name => ({
      tension: name === 'opacity' ? 250 : 300,
      friction: 25
    })
  })

  return (
    <>
      <MenuDisclosure {...menu} {...disclosure.props}>
        {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
      </MenuDisclosure>
      <Menu
        {...menu}
        {...props}
        as={animated.div}
        style={{
          opacity,
          transformOrigin: 'top center',
          transform: scale.interpolate(
            (s = 0) => `${menu.unstable_popoverStyles.transform} scaleY(${s})`
          )
        }}
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
