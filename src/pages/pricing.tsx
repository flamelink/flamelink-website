import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageContainer from '../components/page-container'
import PageHeader from '../components/page-header'

function PricingPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'pricing']} title="Pricing" />
      <PageHeader title="Pricing" />
      <PageContainer>
        <section className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:mr-8">
            <blockquote className="border-l-4 border-gray-900 font-serif leading-loose pl-4 text-justify">
              The point is... to live one's life in the full complexity of what
              one is, which is something much darker, more contradictory, more
              of a maelstrom of impulses and passions, of cruelty, ecstacy, and
              madness, than is apparent to the civilized being who glides on the
              surface and fits smoothly into the world.
            </blockquote>

            <cite className="font-bold mt-4 text-right text-xs uppercase block">
              – Thomas Nagel
            </cite>
          </div>
        </section>
      </PageContainer>
    </Layout>
  )
}

export default PricingPage
