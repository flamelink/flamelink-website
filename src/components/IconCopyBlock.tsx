import React from 'react'
import { css } from '@emotion/core'
import get from 'lodash/get'
import { Box } from 'reakit/Box'
import tw from 'tailwind.macro'

export type IconCopyBlockProps = {
  title: string
  excerpt?: string
  iconUrl?: string
  wider?: boolean
}

const IconCopyBlock: React.FC<IconCopyBlockProps> = ({
  title,
  excerpt,
  iconUrl,
  wider
}) => {
  return (
    <li
      css={props => css`
        ${tw`text-center flex-initial w-full`}

        h3 {
          overflow-wrap: break-word;
        }

        ${
          wider
            ? css`
                margin: 0 1.5rem 2.5rem;
                max-width: 19.0625rem;
              `
            : css`
                margin: 0 0.703125rem 2.5rem;
                max-width: 15.9375rem;

                h3 {
                  max-width: 12rem;
                }
              `
        }

        ${!excerpt &&
          css`
            max-width: 10.1rem;
          `}

        /* Full width for small screens */
        ${
          get(props, 'device.size') === 'xs'
            ? css`
                min-width: 100%;
                max-width: 100%;
                padding: 0 1.5rem;
              `
            : ''
        }
      `}
    >
      <Box className="flex flex-col items-center justify-start w-full">
        {iconUrl ? (
          <span className="w-10 h-10">
            <img src={iconUrl} alt="" loading="lazy" width="40" height="40" />
          </span>
        ) : null}
        <h3
          className="text-xl text-heading font-medium max-w-full"
          style={{ margin: '0.625rem 0' }}
        >
          {title}
        </h3>
        <Box className="max-w-full">{excerpt ? <p>{excerpt}</p> : null}</Box>
      </Box>
    </li>
  )
}

IconCopyBlock.defaultProps = {
  title: '',
  excerpt: '',
  iconUrl: '',
  wider: false
}

export default IconCopyBlock
