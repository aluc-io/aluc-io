const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    //const blogPost = path.resolve('./src/templates/blog-post.js')
    const blogPost = path.resolve('./src/templates/PostTemplate.js')
    resolve( graphql(`{
      allMarkdownRemark(
        sort: { fields: [fields___prefix], order: DESC },
        limit: 1000
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
              prefix
            }
            frontmatter {
              title
            }
          }
        }
      }
    }`).then(result => {
      if (result.errors) {
        console.error(result.errors)
        reject(result.errors)
        return
      }

      // Create blog posts pages.
      let posts = result.data.allMarkdownRemark.edges
      posts = _.reject(posts, post => {
        
        // 아래 "if( isPost && ! isIndexMd ) return" 문에서 fileds 생성이 안된 노드들
        if (!post.node.fields) return true
        if ((!post.node.frontmatter || {}).published) return true

        const isPost = /^\/posts\//.test(post.node.fields.slug)
        const isIndexMd = /index\.md$/.test(post.node.fileAbsolutePath)
        return isPost && ! isIndexMd
      })

      _.each(posts, (post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        const slug = post.node.fields.slug
        createPage({
          path: slug,
          component: blogPost,
          context: { slug, previous, next },
        })
      })
    }))
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== `MarkdownRemark`) return

  const { createNodeField } = actions
  const contentsPath = path.resolve('./contents')
  const fileRelativePath = path.relative(contentsPath, node.fileAbsolutePath)
  const slug = `/` + path.dirname(fileRelativePath)

  const isPost = /^posts\//.test(fileRelativePath)
  const isIndexMd = /index\.md$/.test(fileRelativePath)
  if( isPost && ! isIndexMd ) return

  createNodeField({ node, name: `fileRelativePath`, value: fileRelativePath })

  const relativeFilePath = createFilePath({ node, getNode, trailingSlash: false })
  createNodeField({ node, name: `slug`, value: relativeFilePath })

  const prefix = path.basename(slug).split('--')[0]
  createNodeField({ node, name: `prefix`, value: prefix })
}

exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.ya?ml$/,
          include: path.resolve("data"),
          use: {
            loader: 'yaml-loader',
          }
        }
      ]
    },
    plugins: [
      plugins.define({
        'process.env.ALUCIO_SITE_URL': JSON.stringify(process.env.ALUCIO_SITE_URL),
        'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
        'process.env.ALGOLIA_SEARCH_ONLY_API_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_ONLY_API_KEY),
        'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(process.env.ALGOLIA_INDEX_NAME),
        'process.env.ALUCIO_FACEBOOK_APP_ID': JSON.stringify(process.env.ALUCIO_FACEBOOK_APP_ID),
        'process.env.ALUCIO_UTTERANCES_REPO': JSON.stringify(process.env.ALUCIO_UTTERANCES_REPO),
      }),
    ],
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "styled-jsx/babel",
    options: {
      plugins: [
        "styled-jsx-plugin-postcss",
        ["styled-jsx-plugin-stylelint", { stylelint: require('./stylelint.config') }],
      ],
    }
  })

  actions.setBabelPlugin({
    name: "babel-plugin-module-resolver",
    options: {
      alias: {
        "_src": "./src",
        "_contents": "./contents",
        "_config": "./config",
      }
    }
  })

  actions.setBabelPlugin({
    name: "babel-plugin-import",
    options: { libraryName: "antd", style: "css" },
  })

  actions.setBabelPlugin({ name: `@babel/plugin-syntax-dynamic-import` })
  actions.setBabelPlugin({ name: `babel-plugin-dynamic-import-webpack` })
}
