import React from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import { useMediaQuery } from './media-queries'

// @ts-ignore
import tailwindConfig from '../../tailwind.config'

export const twConfig = resolveConfig(tailwindConfig)

export const useTheme = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersDarkUI = useMediaQuery('(prefers-color-scheme: dark)')
  const sm = useMediaQuery(`(min-width: ${twConfig.theme.screens.sm})`)
  const md = useMediaQuery(`(min-width: ${twConfig.theme.screens.md})`)
  const lg = useMediaQuery(`(min-width: ${twConfig.theme.screens.lg})`)
  const xl = useMediaQuery(`(min-width: ${twConfig.theme.screens.xl})`)

  return React.useMemo(() => {
    let size = 'xs'

    switch (true) {
      case xl:
        size = 'xl'
        break

      case lg:
        size = 'lg'
        break

      case md:
        size = 'md'
        break

      case sm:
        size = 'sm'
        break

      default:
        break
    }

    const sizes = {
      xsUp: size !== 'xs',
      smUp: sm,
      mdUp: md,
      lgUp: lg,
      xlUp: xl
    }

    return {
      ...twConfig.theme,
      device: {
        prefersReducedMotion,
        prefersDarkUI,
        size,
        sizes
      }
    }
  }, [prefersDarkUI, prefersReducedMotion, sm, md, lg, xl])
}
