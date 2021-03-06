import React from "react"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import Scrollspy from 'react-scrollspy'
import cheerio from 'cheerio'
import { findIndex } from 'lodash'
import cx from 'classnames'

const LI = ({ value, depth, id, isActive }) => {

  const cn = cx(depth, {actived: isActive})
  const $v = cheerio.load(value, { xmlMode: true })
  const vArr = $v().children()[0].children.map( node => {
    if (node.type === 'tag') return node.children[0].data
    else return node.data
  })

  return (
    <li className={cn}>
      <a href={'#' + id}>{vArr.join('')}</a>
      <style jsx>{`
        li {
          font-size: 13px;
          margin: 0px;
        }
        :global(.actived) {
          background-color: #6e6ee866;
        }
        :global(.depth1) {
          padding-left: 0px;
        }
        :global(.depth2) {
          padding-left: 12px;
        }
        :global(.depth3) {
          padding-left: 24px;
        }
      `}</style>
    </li>
  )
}

LI.propTypes = {
  value: PropTypes.string.isRequired,
  depth: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

class TOC extends React.Component {
  constructor(props) {
    super(props)
    const { headings, tableOfContents } = this.props
    const $ = cheerio.load(tableOfContents)
    const aArr = $('a').toArray()
    const hrefArr = aArr.map( a => a.attribs.href ).map( href => href.replace(/.*#(.*)$/, '$1'))
    this.state = {
      headings: headings.map( (h,i) => ({
        ...h,
        depth: `depth${h.depth}`,
        id: decodeURIComponent(hrefArr[i]),
        isActive: false,
      })),
    }
  }
  updateTOC = (e) => {
    if (!e) return

    const id = e.getAttribute('id')
    const idx = findIndex(this.state.headings, { id })
    const deactive = obj => obj.isActive ? { ...obj, isActive: false } : obj
    this.setState({ 
      headings: [
        ...this.state.headings.slice(0,idx).map( deactive ),
        { ...this.state.headings[idx], isActive: true },
        ...this.state.headings.slice(idx+1).map( deactive ),
      ]
    })
  }

  goToTop = () => {
    window.scrollTo(0,0)
    setTimeout(() => location.hash = '', 500)
  }

  render() {
    const headingIdArr = this.state.headings.map(h => h.id)
    const { showLayout, title } = this.props

    return (
      <div className='tocBox'>
        <div className='toc'>
          <div className='title' onClick={this.goToTop}>{title}</div>
          <div className="tocInner">
            <Scrollspy
              ref={t => this.ss = t}
              items={headingIdArr}
              currentClassName="is-current"
              scrolledPastClassName='past'
              onUpdate={this.updateTOC}
            >
              { this.state.headings.map( (h,i) => <LI key={i} value={h.value} depth={h.depth} id={h.id} isActive={h.isActive}/>)}
            </Scrollspy>
          </div>
        </div>

        <style jsx>{`
          .title {
            cursor: pointer;
          }
          .title:hover {
            box-shadow: none;
            background-color: rgba(0, 128, 0, 0.2);
          }
          .tocBox {
            width: 300px;
            position: fixed;
            left: 10px;
            background-color: red;
          }
          .toc {
            margin-top: 122px;
            width: 220px;
            position: fixed;
            overflow: hidden;
          }
          .tocInner {
            background-color: ${showLayout ? '#0000ff24' : 'initial'};
          }
          .inner :global(a:hover) {
            box-shadow: none;
            background-color: rgba(0, 128, 0, 0.2);
          }
          .inner :global(a) {
            box-shadow: none;
          }
        `}</style>
      </div>
    )
  }
}

TOC.propTypes = {
  headings: PropTypes.array.isRequired,
  tableOfContents: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showLayout: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    //isWideScreen: state.isWideScreen,
    //fontSizeIncrease: state.fontSizeIncrease,
    showLayout: state.layout.showLayout,
  }
}

export default connect(mapStateToProps)(TOC)

