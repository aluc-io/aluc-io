const { compact } = require('lodash')
const queryAndTransformer = require('./config/algoria-query-transformer')

module.exports = {
  siteMetadata: {
    title: 'aluc.io',
    siteTitle: 'aluc.io',
    author: 'Alfred UC',
    description: "aluc.io is alfreduc's blog",
    siteUrl: 'https://aluc.io',
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || "",
      searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY || "",
      indexName: process.env.ALGOLIA_INDEX_NAME || "",
    },
    facebook: {
      appId: process.env.ALUCIO_FACEBOOK_APP_ID || '',
    },
  },
  pathPrefix: '/',
  plugins: compact([
    process.env.CIRCLE_TAG && process.env.CIRCLE_TAG !== 'local' && {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID || "",
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY || "",
        indexName: process.env.ALGOLIA_INDEX_NAME || "",
        queries: queryAndTransformer,
        chunkSize: 1000, // default: 1000
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents/posts/`,
        name: "posts",
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents/parts/`,
        name: `parts`,
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        plugins: [
          {
            resolve: `my-gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: "transparent",
              wrapperStyle: ({ query }) => {
                const { mw } = query
                return mw ? `max-width: ${mw}px;` : ''
              }
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    //`gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ]),
}
