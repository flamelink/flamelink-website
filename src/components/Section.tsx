import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const Section = styled.section`
  ${tw`
    w-full
    h-auto
    flex flex-col
    justify-start
    items-center
    overflow-x-hidden
    overflow-y-visible
    py-10 sm:py-20
  `}

  scroll-snap-align: start;
`

export const SectionContainer = tw.div`
  flex
  flex-col
  justify-start
  items-center
  max-w-6xl
  mx-4
`

export const SectionTitle = styled.h2`
  ${tw`
    font-light
    text-center
    text-heading
    text-2xl sm:text-4xl md:text-5xl
  `}

  margin-bottom: 3.125rem;
`
