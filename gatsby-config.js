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
    siteUrl: 'https://flamelink.io'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    // TODO: Add Flamelink source plugin configuration
    // {
    //   resolve: 'gatsby-source-flamelink',
    //   options: {
    //     firebaseConfig: {
    //       pathToServiceAccount: 'path/to/serviceAccountKey.json',
    //       databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
    //       storageBucket: '<PROJECT_ID>.appspot.com'
    //     },
    //     dbType: 'cf',
    //     environment: 'production',
    //     content: true,
    //     populate: true,
    //     navigation: true,
    //     globals: true
    //   }
    // },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto:300,500&display=swap']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: []
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/', disallow: '' }]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Flamelink.io',
        short_name: 'flamelink.io',
        start_url: '/',
        background_color: '#f5f5f5',
        theme_color: '#f37046',
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
    'gatsby-plugin-offline'
  ]
}
