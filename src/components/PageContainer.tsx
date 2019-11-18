import React from 'react'
import { Box, BoxProps } from 'reakit/Box'

const PageContainer: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      className="flex flex-col flex-1 md:justify-center max-w-6xl mx-auto px-4 py-8 md:p-8 w-full"
    >
      {children}
    </Box>
  )
}

export default PageContainer
