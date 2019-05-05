import { Link } from "gatsby"
import { connect } from "react-redux"
import Avatar from "@material-ui/core/Avatar"
import PropTypes from "prop-types"
import React from "react"
import avatar from "../../../static/new-avatar.png"

const LayoutHeader = props => {
  const { showLayout } = props

  return (
    <div className={'box'}>
      <div className='avatarBox'>
        <Link to="/">
          <Avatar alt={'home'} src={avatar} className='avatar' />
        </Link>
      </div>
      <style jsx>{`
        .box {
          background-color: ${showLayout ? "rgba(64, 148, 64, 0.31)" : "none"};
          position: fixed;
          left: 10px;
          top: 10px;
        }
        .avatarBox :global(img) {
          margin-bottom: 0px;
        }
        .box :global(a) {
          box-shadow: none;
          display: inline-block;
        }
        .box :global(.avatar) {
          border: 1px solid #ddd;
          width: 44px;
          height: 44px;
          background-color: ${showLayout ? "rgba(64, 48, 64, 0.31)" : "none"};
        }
      `}</style>
    </div>
  )
}

LayoutHeader.propTypes = {
  showLayout: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default connect(mapStateToProps)(LayoutHeader)
