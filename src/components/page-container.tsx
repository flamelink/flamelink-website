import React from 'react'
import { Box, BoxProps } from 'reakit/Box'

interface Props extends BoxProps {
  as?: React.ReactType
}

const PageContainer: React.FC<Props> = ({ children, as }) => {
  return (
    <Box
      as={as}
      className="flex flex-col flex-1 md:justify-center max-w-6xl mx-auto px-4 py-8 md:p-8 w-full"
    >
      {children}
    </Box>
  )
}

PageContainer.defaultProps = {
  as: 'main'
}

export default PageContainer
