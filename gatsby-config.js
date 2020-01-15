const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  require('dotenv').config()
}

const SITE_URL = process.env.SITE_URL || 'https://flamelink-staging.web.app'
const FLAMELINK_ENVIRONMENT = process.env.FLAMELINK_ENV || 'staging'

const parseNewLines = function(key) {
  return typeof key === 'string' ? key.replace(/\\n/g, '\n') : key
}

const privateKey = parseNewLines(process.env.FIREBASE_CONFIG_PK)

module.exports = {
  siteMetadata: {
    title: 'Flamelink',
    tagline: 'A Firebase CMS',
    description:
      'Flamelink.io is an easy to use, content centric CMS that integrates with Google\'s Firebase to build Mobile and Web Apps, Digital Campaigns, and Websites.',
    socialLinks: {
      facebook: 'https://www.facebook.com/FlamelinkCMS/',
      twitter: 'https://twitter.com/flamelinkcms',
      youtube: 'https://www.youtube.com/channel/UCPSOGjXxn2he52czV1XsW3g',
      github: 'https://github.com/flamelink'
    },
    socialHandles: {
      facebook: 'FlamelinkCMS',
      twitter: '@FlamelinkCMS',
      youtube: '',
      github: 'flamelink'
    },
    siteUrl: SITE_URL
  },
  plugins: [
    // To test IE 11 in dev-mode
    ...(process.env.BROWSERSLIST_ENV === 'localIe11'
      ? [
          {
            resolve: 'gatsby-plugin-polyfill-io',
            options: {
              features: ['Array.prototype.map', 'fetch', 'EventSource']
            }
          },
          {
            resolve: 'gatsby-plugin-compile-es6-packages',
            options: {
              modules: [
                'react-schemaorg',
                'react-spring',
                'tailwind.macro',
                'tailwindcss',
                'reakit',
                'reakit-system',
                'gatsby-plugin-layout'
              ]
            }
          }
        ]
      : []),
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    ...(process.env.GOOGLE_ANALYTICS_TRACKING_ID
      ? [
          {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
              trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
              head: true,
              respectDNT: true,
              pageTransitionDelay: 0,
              sampleRate: 100,
              siteSpeedSampleRate: 10,
              forceSSL: true
            }
          }
        ]
      : []),
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: 'gatsby-source-flamelink',
      options: {
        firebaseConfig: {
          projectId: 'flamelink-website',
          privateKey,
          clientEmail:
            'firebase-adminsdk-w2zzo@flamelink-website.iam.gserviceaccount.com',
          databaseURL: 'https://flamelink-website.firebaseio.com',
          storageBucket: 'flamelink-website.appspot.com'
        },
        dbType: 'cf',
        environment: FLAMELINK_ENVIRONMENT,
        locales: ['en-US'],
        content: true,
        populate: true,
        navigation: [{ navigationKey: 'headerMenu', structure: 'nested' }],
        globals: true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: []
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => FLAMELINK_ENVIRONMENT,
        env: {
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Flamelink.io',
        short_name: 'flamelink.io',
        start_url: '/',
        background_color: '#f5f5f5',
        theme_color: '#ff6633',
        display: 'minimal-ui',
        icon: 'src/images/flamelink-icon-1024x1024.png'
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/globals.css']
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: [
        {
          precachePages: [
            '/features',
            '/business',
            '/content',
            '/tech',
            '/pricing',
            '/case-studies',
            '/case-studies/*',
            '/slack',
            '/security'
          ],
          appendScript: require.resolve('./src/custom-sw-code.js')
        }
      ]
    }
  ]
}
