import { connect } from 'react-redux'
import { forceCheck } from "react-lazyload"
import PropTypes from "prop-types"
import React from "react"

import ListItem from "./ListItem"

class List extends React.Component {

  render() {
    const { posts, linkOnClick } = this.props
    const { showLayout } = this.props

    return (
      <div className={'posts'}>
        <div className={'inner'}>
          <ul className={'list'}>
            {posts && posts.map((post, i) => (
              <ListItem
                key={i}
                post={post}
                linkOnClick={linkOnClick}
                categoryFilter={null}
                showLayout={showLayout}
              />
            ))}
          </ul>
        </div>
        <style jsx>{`
          .posts {
            left: 0px;
            top: 0px;
            width: 100%;
          }
          .inner { }
          .list {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

List.propTypes = {
  posts: PropTypes.array.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  showLayout: PropTypes.bool.isRequired,
  //categoryFilter: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default connect(mapStateToProps)(List)
