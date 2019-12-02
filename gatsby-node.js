exports.createPages = async function({ actions, graphql }) {
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
}
