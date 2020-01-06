import React from 'react'
import Helmet from 'react-helmet'
import take from 'lodash/take'
import { useStaticQuery, graphql } from 'gatsby'

type MetaEntry =
  | {
      name: string
      content: any
    }
  | {
      property: string
      content: any
    }

type Props = {
  description?: string
  lang?: string
  image?: string
  url?: string
  meta?: MetaEntry[]
  keywords?: string[]
  title: string
  children?: React.ReactNode
}

const SEO: React.FC<Props> = ({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  image,
  url,
  children
}) => {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          tagline
          siteUrl
          socialLinks {
            facebook
            twitter
            youtube
            github
          }
          socialHandles {
            facebook
            twitter
            youtube
            github
          }
        }
      }
    }
  `)

  // Take first 300 characters
  const metaDescription = take(
    (description || site.siteMetadata.description || '').split(''),
    300
  ).join('')

  const metaTags = meta
    .concat([
      {
        name: 'description',
        content: metaDescription
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: metaDescription
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: `${site.siteMetadata.title} | ${site.siteMetadata.tagline}`
      },
      {
        property: 'og:locale',
        content: lang
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:creator',
        content: site.siteMetadata.socialHandles.twitter
      },
      {
        name: 'twitter:title',
        // Twitter allows a max of 70 characters
        content: take(title.split(''), 70).join('')
      },
      {
        name: 'twitter:description',
        // Twitter allows a max of 200 characters
        content: take(metaDescription.split(''), 200).join('')
      }
    ])
    .concat(
      keywords && keywords.length > 0
        ? {
            name: 'keywords',
            content: keywords.join(', ')
          }
        : []
    )

  if (image) {
    const metaImage = image.startsWith('/')
      ? `${site.siteMetadata.siteUrl}${image}`
      : image

    metaTags.push(
      {
        property: 'og:image',
        content: metaImage
      },
      {
        name: 'twitter:image',
        content: metaImage
      }
    )
  }

  if (typeof url === 'string') {
    metaTags.push({
      property: 'og:url',
      content: url.startsWith('/')
        ? `${site.siteMetadata.siteUrl}${url}`
        : url || site.siteMetadata.siteUrl
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      meta={metaTags}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title} | ${site.siteMetadata.tagline}`}
    >
      {children}
    </Helmet>
  )
}

SEO.defaultProps = {
  children: null
}

export default SEO
