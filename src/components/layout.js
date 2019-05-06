import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from 'react'
import throttle from "lodash/throttle"

import { setWindowSize } from '../store'
import { rhythm, scale } from '../utils/typography'
import ToolBox from './ToolBox'
import TOC from "../components/Post/TOC"

class Layout extends React.Component {
  componentDidMount() {
    this.resizeHandler()
    if (typeof window === "undefined") return

    const throttleHandler = throttle(this.resizeHandler, 500)
    window.addEventListener("resize", throttleHandler, false)
  }

  resizeHandler = () => {
    const { innerWidth: width, innerHeight: height } = window
    this.props.setWindowSize({ width, height })
  }

  render() {
    const { location, children } = this.props

    return (
      <div className='layout'>
        <ToolBox location={location}/>
        <div className='content'>{children}</div>
        <style jsx>{`
          .layout {
            margin-left: auto;
            margin-right: auto;
            max-width: ${rhythm(25.2)};
            min-width: ${rhythm(12)};
            padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
          }
          .content {
            width: 100%;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
  setWindowSize: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  //fontSizeIncrease: PropTypes.number.isRequired,
  //setFontSizeIncrease: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    //isWideScreen: state.isWideScreen,
    //fontSizeIncrease: state.fontSizeIncrease,
    showLayout: state.layout.showLayout,
  }
}

const mapDispatchToProps = {
  setWindowSize,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
