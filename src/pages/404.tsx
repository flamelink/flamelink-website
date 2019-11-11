import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import abductionIllustration from '../images/abduction-illustration.svg'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'

const AlienTitle = styled.h2`
  ${tw`bg-yellow-400 text-2xl font-bold inline-block my-8 ml-8 p-3`}
`

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div>
        <img
          alt="Ghost getting abducted by aliens"
          className="block mx-auto w-1/2"
          src={abductionIllustration}
        />
        <AlienTitle>What you're looking for is not there...</AlienTitle>
      </div>
    </Layout>
  )
}

export default NotFoundPage
