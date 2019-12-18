import React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export type IconCopyBlockProps = {
  title: string
  excerpt?: string
  iconUrl?: string
}

const IconCopyBlock: React.FC<IconCopyBlockProps> = ({
  title,
  excerpt,
  iconUrl
}) => {
  return (
    <li
      css={css`
        ${tw`text-center flex flex-col items-center justify-start`}

        margin: 0 1.5rem 2.5rem;
        max-width: 19.0625rem;
      `}
    >
      {iconUrl ? (
        <span className="w-10 h-10">
          <img src={iconUrl} alt="" loading="lazy" width="40" height="40" />
        </span>
      ) : null}
      <h3
        className="text-xl text-heading font-medium"
        style={{ margin: '0.625rem 0' }}
      >
        {title}
      </h3>
      {excerpt ? <p>{excerpt}</p> : null}
    </li>
  )
}

IconCopyBlock.defaultProps = {
  title: '',
  excerpt: '',
  iconUrl: ''
}

export default IconCopyBlock
