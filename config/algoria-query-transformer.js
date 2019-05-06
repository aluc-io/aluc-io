const algoliasearch = require("algoliasearch")
const flatten = require("lodash/flatten")
const includes = require("lodash/includes")
const compact = require("lodash/compact")

const query = `{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
        htmlAst
        internal {
          content
        }
        frontmatter {
          title
          published
        }
      }
    }
  }
}`

const transformer = ({ data }) => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)
  index.setSettings({ searchableAttributes: ["text", "slug", "searchableFrontmatter"] })

  let headingList = data.allMarkdownRemark.edges.map(({ node }) => {
    if (!node.fields) return null
    if (!(node.frontmatter || {}).published) return null

    const list = []
    const algoliaObjectList = []

    const recusive = c => {
      list.push({
        type: c.type,
        tagName: c.tagName,
        value: c.value,
        properties: c.properties,
      })

      if (!includes(["h1", "h2", "h3"], c.tagName)) {
        c.children && c.children.forEach(recusive)
      }
    }
    node.htmlAst.children.forEach(recusive)

    let currentHeadingId = node.frontmatter.title
    let currentSlug = ""
    let tmpTextList = []

    list.forEach(n => {
      if (includes(["h1", "h2", "h3"], n.tagName)) {
        tmpTextList = compact(tmpTextList)

        // 모아 놓은 Text 로 algoliaRecord 생성
        algoliaObjectList.push({
          objectID: currentHeadingId,
          text: compact(tmpTextList).join(" "),
          slug: currentSlug,
          fields: node.fields,
          frontmatter: node.frontmatter,
        })

        currentHeadingId = `${node.fields.slug}#${n.properties.id}`
        currentSlug = n.properties.id

        tmpTextList = []
      } else if (n.value) {
        const text = n.value.replace(/\n/g, "").trim()
        text && tmpTextList.push(text)
      }
    })

    // 마지막 모아 놓은 Text 로 algoliaRecord 생성
    algoliaObjectList.push({
      objectID: currentHeadingId,
      text: compact(tmpTextList).join(" "),
      slug: currentSlug,
      fields: node.fields,
      frontmatter: node.frontmatter,
    })

    return algoliaObjectList
  })

  headingList = compact(headingList)
  headingList = flatten(headingList)
  return headingList
}

module.exports = [{ query, transformer }]
