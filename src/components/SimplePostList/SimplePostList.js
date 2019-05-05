import { connect } from "react-redux"
import { forceCheck } from "react-lazyload"
import PropTypes from "prop-types"
import React from 'react'

import { setNavigatorPosition, setNavigatorShape, setCategoryFilter } from "_src/store"
import List from "./List"
import theme from "_src/theme/theme.yaml"

class SimplePostList extends React.Component {

  render() {
    const { posts, navigatorPosition, navigatorShape, categoryFilter } = this.props
    const { showLayout } = this.props

    return (
      <div className='box'>
        <List
          posts={posts}
          navigatorPosition={navigatorPosition}
          navigatorShape={navigatorShape}
          linkOnClick={(e) => console.log(e)}
          expandOnClick={this.expandOnClick}
          categoryFilter={categoryFilter}
          removeFilter={this.removefilterOnClick}
        />
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

