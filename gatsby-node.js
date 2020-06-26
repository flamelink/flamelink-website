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
      allFlamelinkCaseStudiesContent(
        filter: { _fl_meta_: { status: { eq: "publish" } } }
      ) {
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
              content {
                childMarkdownRemark {
                  html
                }
              }
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
            mainImage {
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
      mainImage,
      pageSections
    } = caseStudy.node

    const fullSlug = `/case-studies/${slug}`

    actions.createPage({
      path: fullSlug,
      component: require.resolve('./src/templates/case-study-page.tsx'),
      context: {
        title,
        slug: fullSlug,
        excerpt,
        brandColour,
        logo,
        backgroundImage,
        mainImage,
        pageSections
      }
    })
  })

  // Individual Landing pages
  const { data: landingPages } = await graphql(`
    query LandingPagesQuery {
      allFlamelinkLandingPagesContent(
        filter: { _fl_meta_: { status: { eq: "publish" } } }
      ) {
        edges {
          node {
            id
            title
            slug
            flamelink_locale
            content {
              childMarkdownRemark {
                html
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
            cta {
              text
              link
              show
            }
            seo {
              title
              keywords
              description
            }
          }
        }
      }
    }
  `)

  landingPages.allFlamelinkLandingPagesContent.edges.forEach(landingPage => {
    const {
      slug,
      flamelink_locale: locale,
      title,
      backgroundImage,
      content: {
        childMarkdownRemark: { html }
      },
      cta,
      seo
    } = landingPage.node

    const fullSlug = `/${slug}`

    actions.createPage({
      path: fullSlug,
      component: require.resolve('./src/templates/landing-page.tsx'),
      context: {
        title,
        slug: fullSlug,
        html,
        backgroundImage,
        cta,
        seo,
        locale
      }
    })
  })
}

// Support IE11 when running gatsby develop
exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  stage,
  loaders
}) {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-hot-loader/,
            use: [loaders.js()]
          }
        ]
      }
    })
  }

  // Fix Typeform for production builds
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@typeform/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
