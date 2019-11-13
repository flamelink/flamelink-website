import React from 'react'
import { Button } from 'reakit/Button'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageHeader from '../components/page-header'
import PageContainer from '../components/page-container'
import catAndHumanIllustration from '../images/cat-and-human-illustration.svg'

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={['gatsby', 'tailwind', 'react', 'tailwindcss']}
        title="Home"
      />

      <PageHeader>
        <PageContainer>
          <h1 className="text-white font-light text-5xl uppercase">
            <span>A CMS for</span>
            <span className="text-6xl">Firebase</span>
          </h1>
          <Button className="border-white border-2 text-white py-6 px-8">
            Learn More
          </Button>
        </PageContainer>
      </PageHeader>
      <PageContainer>
        <section className="text-center">
          <img
            alt="Cat and human sitting on a couch"
            className="block mx-auto w-1/2"
            src={catAndHumanIllustration}
          />

          <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
            Hey there! Welcome to your first Gatsby site.
          </h2>

          <p>
            If you know Firebase, you’ll know that it’s speedy, secure and
            scalable. Which is why over 1.2 million apps worldwide rely on
            Firebase to keep them up and running. Flamelink is a realtime,
            headless CMS, built to seamlessly plug into Firebase’s storage
            buckets to give you an easy-to-use interface with which to add,
            manage and update content - whether you’re a coder, or a content
            manager.
          </p>
        </section>
      </PageContainer>
    </Layout>
  )
}

export default IndexPage
