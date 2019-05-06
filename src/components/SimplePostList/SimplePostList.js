import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from 'react'

import { setNavigatorPosition, setNavigatorShape, setCategoryFilter } from "_src/store"
import theme from "_src/theme/theme.yaml"
import ListItem from './ListItem';

class SimplePostList extends React.Component {

  render() {
    const { posts, showLayout } = this.props

    return (
      <div className='box'>
        <div className={'posts'}>
          <div className={'inner'}>
            <ul className={'list'}>
              {posts && posts.map((post, i) => (
                <ListItem
                  key={i}
                  post={post}
                  categoryFilter={null}
                  showLayout={showLayout}
                />
              ))}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .box {
            transform: translate3d(0, 0, 0);
            width: 100%;
            background-color: ${showLayout ? "rgba(0, 21, 128, 0.17)" : theme.navigator.colors.background};
            margin: 10px auto 0 auto;
          }
          @media ${theme.mediaQuery.s} {
            .box {
              padding: ${theme.space.layoutPadding.s};
            }
          }
          @media ${theme.mediaQuery.m} {
            .box {
              padding: ${theme.space.layoutPadding.m};
            }
          }
          @media ${theme.mediaQuery.l} {
            .box {
              padding: ${theme.space.layoutPadding.l};
            }
          }
          .posts {
            left: 0px;
            top: 0px;
            width: 100%;
          }
          .list {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    )
  }
}

SimplePostList.propTypes = {
  posts: PropTypes.array.isRequired,
  showLayout: PropTypes.bool.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  //setNavigatorPosition: PropTypes.func.isRequired,
  //setNavigatorShape: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  //setCategoryFilter: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  navigatorPosition: state.navigatorPosition,
  navigatorShape: state.navigatorShape,
  categoryFilter: state.categoryFilter,
  showLayout: state.layout.showLayout,
})

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setCategoryFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePostList)

