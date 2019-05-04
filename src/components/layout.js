import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from 'react'
import throttle from "lodash/throttle"

import { setWindowSize } from '_src/store'

import { rhythm, scale } from '../utils/typography'
import ToolBox from './ToolBox'
import theme from "../theme/theme.yaml"
import TOC from "../components/Post/TOC"

class Layout extends React.Component {
  componentDidMount() {
    this.resizeHandler()
    if (typeof window !== "undefined") {
      const throttleHandler = throttle(this.resizeHandler, 500)
      window.addEventListener("resize", throttleHandler, false)
    }
  }

  resizeHandler = () => {
    this.props.setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  render() {
    const { location, children, canRenderTOC, headings, tableOfContents } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    // let header

    return (
      <div className='layout'>
        <ToolBox location={location}/>
        <div className='tocBox'>
          { canRenderTOC && <TOC headings={headings} tableOfContents={tableOfContents}/>}
        </div>
        <div className='content'>
          {children}
        </div>
        <style jsx>{`
          .layout {
            margin-left: auto;
            margin-right: auto;
            max-width: ${rhythm(32)};
            padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
          }
          .tocBox {
            width: ${canRenderTOC ? '25%' : '0%' };
            float: left;
            background-color: red;
          }
          .content {
            width: 100%;
            padding-left: ${canRenderTOC ? '25%' : '0%' };
            box-sizing: border-box;
          }
          @from-width m {
            .layout {
            }
          }
          @from-width l {
            .layout {
              max-width: ${rhythm(36)};
            }
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
  canRenderTOC: PropTypes.bool,
  headings: PropTypes.array,
  tableOfContents: PropTypes.string,
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
