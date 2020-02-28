import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { css } from '@emotion/core'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { flamelinkApp } from '../utils/flamelink'
import SEO from '../components/SEO'
import ImageRevealSection from '../components/ImageRevealSection'

type PageSection = {
  // TODO: flesh out
}

type PageContext = {
  realtime?: boolean
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

let caseStudiesSubscription: any

const CaseStudyPage: React.FC<PageProps> = ({ pageContext: pageCtx }) => {
  const [realtimeCaseStudies, setRealtimeCaseStudies] = React.useState()

  if (!caseStudiesSubscription) {
    console.log('Subscription created for caseStudies')
    caseStudiesSubscription = flamelinkApp.content.subscribe({
      schemaKey: 'caseStudies',
      populate: true,
      callback: async (error: any, result: Object) => {
        if (error) {
          return console.error(
            'Something went wrong while retrieving caseStudies content. Details:',
            error
          )
        }

        const slug = get((pageContext.slug || []).split('/'), 2, [])

        setRealtimeCaseStudies({
          realtime: true,
          ...reduce(
            result,
            (res: any, cs: any) => {
              if (cs.slug === slug) {
                res = {
                  ...cs,
                  slug: `/${get(slug, 1, '')}/${cs.slug}`
                }
              }
              return res
            },
            {}
          )
        })
      }
    })
  }

  const pageContext = realtimeCaseStudies || pageCtx

  const renderSlide = () => {
    const imageContent = (
      <h1 className="text-white font-normal text-5xl uppercase text-center">
        {pageContext.title}
      </h1>
    )

    const slideImage = get(
      pageContext,
      'backgroundImage[0].localFile.childImageSharp.fluid',
      get(pageContext, 'backgroundImage[0].url')
    )

    return pageContext.realtime ? (
      <section
        className="w-screen pt-48 pb-20"
        style={{ marginTop: '-7rem' }}
        css={css`
          position: relative;
          opacity: 0.99;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: ${pageContext.brandColour};
          background-image: url("${slideImage}");
        `}
      >
        {imageContent}
      </section>
    ) : (
      <BackgroundImage
        Tag="section"
        className="w-screen pt-48 pb-20"
        style={{ marginTop: '-7rem' }}
        fluid={slideImage}
        backgroundColor={pageContext.brandColour}
      >
        {imageContent}
      </BackgroundImage>
    )
  }

  return (
    <>
      <SEO
        keywords={['flamelink', 'case study', pageContext.title]}
        title={pageContext.title}
        description={`Flamelink case study for ${pageContext.title}. ${get(
          pageContext,
          'pageSections[0].content',
          ''
        )}`}
        url={pageContext.slug}
        image={get(
          pageContext,
          'mainImage[0].localFile.childImageSharp.fluid.src'
        )}
      />

      {renderSlide()}

      {get(pageContext, 'pageSections', []).map(
        (pageSection, index: number) => (
          <ImageRevealSection
            realtime={pageContext.realtime}
            key={index}
            bg={index % 2 === 0 ? 'white' : 'gray'}
            iconUrl={get(pageSection, 'icon[0].url')}
            heading={pageSection.heading}
            content={pageSection.content}
            imagePosition={get(pageSection, 'imagePosition') || 'right'}
            imageYOverlap={get(pageSection, 'imageYOverlap') || '0rem'}
            fluidImage={get(pageSection, 'image[0].localFile')}
            imageSrc={get(pageSection, 'image[0].url')}
          />
        )
      )}
    </>
  )
}

export default CaseStudyPage
