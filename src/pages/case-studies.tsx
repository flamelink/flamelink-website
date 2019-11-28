import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PageContainer from '../components/PageContainer'
import PageBanner from '../components/PageBanner'

function CaseStudiesPage() {
  return (
    <Layout>
      <SEO keywords={['flamelink', 'case studies']} title="Case Studies" />
      <main>
        <PageBanner title="Case Studies" />
        <PageContainer>
          <section className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:mr-8">Case Studies commence...</div>
          </section>
        </PageContainer>
      </main>
    </Layout>
  )
}

export default CaseStudiesPage
