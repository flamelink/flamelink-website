exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query SecurityPageQuery {
      allFlamelinkSecurityPageContent(
        filter: { slug: { eq: "security" } }
        limit: 1
      ) {
        edges {
          node {
            id
            title
            slug
            flamelink_locale
          }
        }
      }
    }
  `)

  data.allFlamelinkSecurityPageContent.edges.forEach(edge => {
    const { slug, flamelink_locale: locale } = edge.node

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/security-page.tsx'),
      context: { slug, locale }
    })
  })
}
