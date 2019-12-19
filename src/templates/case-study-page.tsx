import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ImageRevealSection from '../components/ImageRevealSection'

type PageSection = {
  // TODO: flesh out
}

type PageContext = {
  title: string
  slug: string
  excerpt: string
  brandColour: string
  logo: any[]
  backgroundImage: any[]
  pageSections: PageSection[]
}

type PageProps = {
  pageContext: PageContext
}

const CaseStudyPage: React.FC<PageProps> = ({ pageContext }) => {
  return (
    <Layout>
      <SEO
        keywords={['flamelink', pageContext.title]}
        title={pageContext.title}
      />
      <BackgroundImage
        Tag="section"
        className="w-screen pt-48 pb-20"
        style={{ marginTop: '-7rem' }}
        fluid={get(
          pageContext,
          'backgroundImage[0].localFile.childImageSharp.fluid'
        )}
        backgroundColor={pageContext.brandColour}
      >
        <h1 className="text-white font-normal text-5xl uppercase text-center">
          {pageContext.title}
        </h1>
      </BackgroundImage>
      {get(pageContext, 'pageSections', []).map(
        (pageSection, index: number) => (
          <ImageRevealSection
            key={index}
            bg={index % 2 === 0 ? 'white' : 'gray'}
            iconUrl={get(pageSection, 'icon[0].url')}
            heading={pageSection.heading}
            content={pageSection.content}
            imagePosition={get(pageSection, 'imagePosition', 'right')}
            imageYOverlap={get(pageSection, 'imageYOverlap', '0rem')}
            fluidImage={get(pageSection, 'image[0].localFile')}
          />
        )
      )}
    </Layout>
  )
}

export default CaseStudyPage
