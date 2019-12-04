import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Section, SectionContainer } from '../components/Section'
import { PageContent } from '../components/PageContent'

type PageSection = {
  // TODO: flesh out
}

type PageContext = {
  title: string
  slug: string
  excerpt: string
  brandColour: string
  testimonial: any
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
        className="bg-brand w-screen pt-48 pb-20"
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
          <Section
            key={index}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
          >
            <PageContent>
              <header className="flex justify-start items-center w-full">
                {get(pageSection, 'icon[0].url') && (
                  <span className="w-10 h-10">
                    <img
                      src={pageSection.icon[0].url}
                      alt=""
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                  </span>
                )}
                <h2>{pageSection.heading}</h2>
              </header>
              {get(pageSection, 'image[0].localFile.childImageSharp.fluid') && (
                <div
                  className="inline-block w-1/2"
                  style={{ float: get(pageSection, 'imagePosition', 'right') }}
                >
                  <Img
                    fluid={get(
                      pageSection,
                      'image[0].localFile.childImageSharp.fluid'
                    )}
                    loading="lazy"
                  />
                </div>
              )}
              <SectionContainer>
                <p>{pageSection.content}</p>
              </SectionContainer>
            </PageContent>
          </Section>
        )
      )}
    </Layout>
  )
}

export default CaseStudyPage
