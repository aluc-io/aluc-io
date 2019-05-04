import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { graphql } from "gatsby"
require("core-js/fn/array/find")
require("prismjs/themes/prism-okaidia.css")

//import { setNavigatorPosition, setNavigatorShape } from "_src/store"
import Post from "../components/Post/"
import Footer from "_src/components/Footer/"
import Seo from "_src/components/Seo"
import Article from "../components/Main/Article"

import theme from "_src/theme/theme.yaml"
import config from "_config/meta"
import Layout from '../components/layout'
import LayoutHeader from '_src/components/LayoutHeader'
import { canRenderTOCSelector } from '../selectors/layout'

class PostTemplate extends React.Component {

  render() {
    const { location, data, pathContext, canRenderTOC } = this.props
    const tableOfContents = data.post.tableOfContents
    const headings = data.post.headings
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook

    return (
      <Layout location={location} canRenderTOC={canRenderTOC} headings={headings} tableOfContents={tableOfContents}>
        { !/\/pages\/1--about\/?$/.test(location.pathname)  && <LayoutHeader location={location} config={config}/>}
        <Post
          location={location}
          post={data.post}
          slug={pathContext.slug}
          author={data.author}
          facebook={facebook}
          tableOfContents={tableOfContents}
          headings={headings}
        />
        <Footer footnote={data.footnote} />
        <Seo config={config} data={data.post} facebook={facebook} />
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    canRenderTOC: canRenderTOCSelector(state),
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
  //navigatorPosition: PropTypes.string.isRequired,
  //setNavigatorPosition: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  canRenderTOC: PropTypes.bool.isRequired,
}

const mapDispatchToProps = {
  //setNavigatorPosition,
  //setNavigatorShape
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate)

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
      headings {
        value
        depth
      }
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        category
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
    author: markdownRemark(fields: { fileRelativePath: { eq: "parts/author.md" }}) {
      id
      html
    }
    footnote: markdownRemark(fields: { fileRelativePath: { eq: "parts/footnote.md" }}) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
