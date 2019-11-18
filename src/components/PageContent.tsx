import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const PageContent = styled.article`
  ${tw`text-base leading-normal font-light`}

  h1, h2, h3, h4, h5 {
    ${tw`font-medium mb-3`}
  }

  h1 {
    ${tw`text-4xl`}
  }

  h2 {
    ${tw`text-3xl`}
  }

  h3 {
    ${tw`text-2xl`}
  }

  h4 {
    ${tw`text-xl`}
  }

  h5 {
    ${tw`text-lg`}
  }

  h6 {
    ${tw`text-sm`}
  }

  strong,
  b {
    ${tw`font-medium`}
  }

  p {
    ${tw`mb-4`}
  }

  ul {
    ${tw`list-inside mb-3 list-disc`}
  }

  ol {
    ${tw`list-inside mb-3 list-decimal`}
  }

  a {
    ${tw`underline hover:text-brand`}
  }
`
