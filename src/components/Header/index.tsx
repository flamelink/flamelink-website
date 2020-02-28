import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button as BaseButton } from 'reakit/Button'
import { Box } from 'reakit/Box'
import { DialogStateReturn } from 'reakit/ts'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { flamelinkApp } from '../../utils/flamelink'
import { refitKeys } from '../../utils/rename-object-keys'
import tw from 'tailwind.macro'
import { MdMenu as MenuIcon, MdClose as CloseIcon } from 'react-icons/md'
import get from 'lodash/get'
import Logo from '../Logo'
import NavigationItem, { CmsNavItem } from './NavigationItem'
import Modal from '../Modal'
import { usePrevious } from '../../hooks/use-previous'

const MainHeader = styled.header<{ sticky: boolean }>`
  ${tw`top-0 w-screen z-30`}

  ${props =>
    props.sticky
      ? tw`sticky bg-brand`
      : tw`relative`}

  transition: background 350ms linear;
`

const MenuButton = styled(BaseButton)`
  ${tw`block md:hidden flex items-center p-0 text-white text-2xl leading-none cursor-pointer focus:outline-none`}
`

const HomeLink = styled(Link)`
  transition: all 290ms ease-out;

  ${tw`no-underline text-white`}
`

let headerMenuSubscription: any
const keyMap = {
  id: 'flamelink_id',
  children: 'flamelink_children'
}

function Header() {
  const [stickyNav, setStickyNav] = React.useState(false)
  const [realtimeContent, setRealtimeContent] = React.useState()

  if (!headerMenuSubscription) {
    console.log('Subscription created for headerMenu')
    headerMenuSubscription = flamelinkApp.nav.subscribe({
      navigationKey: 'headerMenu',
      structure: 'tree',
      callback(error: any, result: Object) {
        if (error) {
          return console.error(
            'Something went wrong while retrieving all the techPersonaPage content. Details:',
            error
          )
        }
        setRealtimeContent({
          realtime: true,
          navItems: get(result, 'items', []).map((item: object) =>
            refitKeys(item, keyMap)
          ),
          original: get(result, 'items')
        })
      }
    })
  }

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
    realtimeContent,
    'navItems',
    get(allFlamelinkHeaderMenuNavigation, 'edges.0.node.items', [])
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

  const previousStickyNav = usePrevious(stickyNav)

  // Hack: we pass the change count through to nav items, so that any drop-downs can be forced to re-render
  const [stickyChangeCount, setStickyChangeCount] = React.useState(0)

  React.useEffect(() => {
    if (previousStickyNav !== stickyNav) {
      setStickyChangeCount(stickyChangeCount + 1)
    }
  }, [previousStickyNav, stickyNav, stickyChangeCount])

  return (
    <MainHeader sticky={stickyNav}>
      <Box
        className={`flex flex-no-wrap items-baseline justify-between w-full max-w-6xl mx-auto p-4 ${
          stickyNav ? 'md:p-3' : 'md:p-8'
        }`}
        css={css`
          transition: all 190ms linear;
        `}
      >
        <HomeLink to="/" aria-label={site.siteMetadata.title}>
          <Logo />
        </HomeLink>

        <Modal
          aria-label="mobile menu"
          className="bg-brand md:hidden"
          tabIndex={-1}
          disclosure={
            <MenuButton>
              <MenuIcon />
            </MenuButton>
          }
          fullWidth
        >
          {({ dialog }: { dialog: DialogStateReturn }) => (
            <nav
              className="flex flex-col justify-center items-center h-full w-full"
              aria-label="mobile menu"
            >
              <BaseButton
                className="text-white text-3xl leading-none mb-6 focus:outline-none"
                onClick={() => dialog.hide()}
              >
                <CloseIcon />
              </BaseButton>
              {navItems.map(NavigationItem)}
            </nav>
          )}
        </Modal>

        <nav
          className="hidden md:visible md:block flex flex-row justify-start items-center w-auto p-0 mt-0"
          aria-label="menu"
        >
          {navItems.map(navItem => (
            <NavigationItem
              key={navItem.uuid}
              {...navItem}
              changeCount={stickyChangeCount}
            />
          ))}
        </nav>
      </Box>
    </MainHeader>
  )
}

export default Header
