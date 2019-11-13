import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageContainer from '../components/page-container'
import PageHeader from '../components/page-header'

function PricingPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'case studies']} title="Case Studies" />
      <PageHeader title="Case Studies" />
      <PageContainer>
        <section className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:mr-8">Case Studies commence...</div>
        </section>
      </PageContainer>
    </Layout>
  )
}

export default PricingPage
