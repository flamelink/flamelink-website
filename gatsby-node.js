exports.createPages = async function({ actions, graphql }) {
  // Security Page
  const { data } = await graphql(`
    query SecurityPageQuery {
      flamelinkSecurityPageContent {
        id
        title
        slug
        flamelink_locale
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)

  const {
    slug,
    flamelink_locale: locale,
    title,
    content: {
      childMarkdownRemark: { html }
    }
  } = data.flamelinkSecurityPageContent

  actions.createPage({
    path: slug,
    component: require.resolve('./src/templates/security-page.tsx'),
    context: { slug, locale, title, html }
  })

  // Individual Case Study pages
  const { data: csData } = await graphql(`
    query CaseStudiesQuery {
      allFlamelinkCaseStudiesContent {
        edges {
          node {
            title
            slug
            excerpt
            brandColour
            pageSections {
              imagePosition
              imageYOverlap
              heading
              content
              icon {
                url
              }
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920, quality: 80) {
                      base64
                      tracedSVG
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                      originalImg
                      originalName
                      presentationWidth
                      presentationHeight
                    }
                  }
                }
              }
            }
            logo {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 460) {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
            backgroundImage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920, quality: 80) {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  csData.allFlamelinkCaseStudiesContent.edges.forEach(caseStudy => {
    const {
      title,
      slug,
      excerpt,
      brandColour,
      logo,
      backgroundImage,
      pageSections
    } = caseStudy.node

    actions.createPage({
      path: `case-studies/${slug}`,
      component: require.resolve('./src/templates/case-study-page.tsx'),
      context: {
        title,
        slug,
        excerpt,
        brandColour,
        logo,
        backgroundImage,
        pageSections
      }
    })
  })
}
