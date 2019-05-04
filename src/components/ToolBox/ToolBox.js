import { Link } from 'gatsby'
import { connect } from "react-redux"
import DeveloperBoard from 'react-icons/lib/md/developer-board'
import Home from 'react-icons/lib/fa/home'
import PropTypes from "prop-types"
import React from "react"
import Search from 'react-icons/lib/fa/search'

import cx from 'classnames'
import { setShowLayout } from '_src/store'
import theme from '_src/theme/theme.yaml'

const ToolBox = (props) => {

  const { showLayout, location } = props
  const boxCN = cx('box', { listPage: location.pathname === '/' })

  return (
    <div className={boxCN}>
      <div className='iconBox'>
        <DeveloperBoard
          className='icon devBoard'
          onClick={() => props.setShowLayout(!showLayout)}
        />
      </div>
      <Link to='/search'>
        <div className='iconBox'>
          <Search className='icon' />
        </div>
      </Link>
      <Link to='/'>
        <div className='iconBox'>
          <Home className='icon' />
        </div>
      </Link>
      <style jsx>{`
        .box {
          background-color: ${showLayout ? 'rgba(234, 151, 255, 0.23)' : 'initial'};
        }
        .iconBox {
          background-color: ${showLayout ? 'rgba(124, 200, 255, 0.8)' : 'initial'};
        }
        .box :global(.icon) {
          fill: ${theme.color.neutral.gray.k};
        }
        .box :global(.icon):hover {
          fill: ${theme.color.neutral.gray.f};
        }
      `}</style>
      <style jsx>{`
        .box {
          position: fixed;
          right: 4px;
          z-index: 10;
        }
        .iconBox {
          transition: all .5s;
          display: inline-block;
          display: block;
          margin-top: 20px;
          margin-right: 10px;
        }
        .box :global(.devBoard) {
          transform: translateY(2px) scale(1.18);
        }
        .box :global(.icon) {
          width: 36px;
          height: 36px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

ToolBox.propTypes = {
  showLayout: PropTypes.bool.isRequired,
  setShowLayout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  setShowLayout,
}

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)
