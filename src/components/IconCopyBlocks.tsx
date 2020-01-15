import React from 'react'
import { Box } from 'reakit/Box'
import IconCopyBlock, { IconCopyBlockProps } from './IconCopyBlock'

type Props = {
  blocks: IconCopyBlockProps[]
  wider?: boolean
  className?: string
}

const IconCopyBlocks: React.FC<Props> = ({ blocks, wider, className }) => {
  if (!blocks || !blocks.length) {
    return null
  }

  return (
    <Box className={`flex-initial -mx-5 max-w-full ${className}`}>
      <ul className="flex flex-wrap justify-center align-start w-full">
        {blocks.map((block, index) => (
          <IconCopyBlock key={index} {...block} wider={wider} />
        ))}
      </ul>
    </Box>
  )
}

IconCopyBlocks.defaultProps = {
  blocks: [],
  wider: false,
  className: ''
}

export default IconCopyBlocks
