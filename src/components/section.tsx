import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const Section = tw.section`
  flex flex-col justify-start items-center py-25
`

export const SectionContainer = tw.div`
  max-w-6xl
`

export const SectionTitle = styled.h2`
  ${tw`text-center text-5xl`}

  margin-bottom: 3.125rem;
`
