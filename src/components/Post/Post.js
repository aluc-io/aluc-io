import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import theme from "../../theme/theme.yaml"
import Headline from "./Headline"
import Content from "../Main/Content"
import PostFooter from "./PostFooter"
import Meta from "./Meta"

const Post = props => {
  const { post, author, slug, facebook, showLayout } = props
  const { location } = props
  const frontmatter = (post || {}).frontmatter

  const title = frontmatter.title
  // const subTitle = frontmatter.subTitle
  const category = frontmatter.category
  const authorName = 'alfreduc'

  const prefix = ((post || {}).fields || {}).prefix
  const html = (post || {}).html

  return (
    <div className='box'>
      <article className="articleBox">
        <Headline title={title} theme={theme}/>
        { !/\/pages\/1--about\/?$/.test(location.pathname) && <Meta prefix={prefix} authorName={authorName} category={category}/>}
        <Content html={html} />
        <PostFooter author={author} post={post} slug={slug} facebook={facebook} />
      </article>
      <style jsx>{`
        .articleBox {
          padding: ${theme.space.inset.xs};
          margin: 20px auto;
          background-color: ${showLayout ? '#a6ff002e' : 'initial' };
        }
        @from-width m {
          .articleBox {
            padding: ${`calc(${theme.space.s}) calc(${theme.space.s})`};
          }
        }
        @from-width l {
          .articleBox {
            padding: ${`calc(${theme.space.default} * 2) 0 calc(${
              theme.space.default
            })`};
            max-width: ${theme.mediaQueryTresholds.L}px;
          }
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    showLayout: state.layout.showLayout,
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  canRenderTOC: PropTypes.bool.isRequired,
  headings: PropTypes.array.isRequired,
  tableOfContents: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  showLayout: PropTypes.bool.isRequired,
}


export default connect(mapStateToProps)(Post)
