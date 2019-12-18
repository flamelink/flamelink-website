import React from 'react'
import IconCopyBlock, { IconCopyBlockProps } from './IconCopyBlock'

type Props = {
  blocks: IconCopyBlockProps[]
}

const IconCopyBlocks: React.FC<Props> = ({ blocks }) => {
  if (!blocks || !blocks.length) {
    return null
  }

  return (
    <ul className="flex flex-wrap flex-grow-0 flex-shrink-0 justify-center align-start mb-5">
      {blocks.map((block, index) => (
        <IconCopyBlock key={index} {...block} />
      ))}
    </ul>
  )
}

IconCopyBlocks.defaultProps = {
  blocks: []
}

export default IconCopyBlocks
