import { Link } from "gatsby"
import { connect } from "react-redux"
import Avatar from "@material-ui/core/Avatar"
import PropTypes from "prop-types"
import React from "react"
import cx from "classnames"

import { isWideScreenSelector } from '_src/selectors/layout'
import avatar from "../../../static/new-avatar.png"
import theme from "../../theme/theme.yaml"

const LayoutHeader = props => {
  const { config, location, showLayout } = props

  const boxCN = cx('box', { listPage: location.pathname === '/' })

  return (
    <div className={boxCN}>
      <div className='avatarBox'>
        <Link className='link' to="/about-me">
          <Avatar alt={config.infoTitle} src={avatar} className='avatar' />
        </Link>
      </div>
      <div className='siteTitleBox'>
        <Link className='siteTitle' to="/">{config.siteTitle}</Link>
      </div>
      <style jsx>{`
        .link {
          display: inline-block;
        }
        .box {
          transform: translate3d(0, 0, 0);
          background-color: ${showLayout ? "rgba(64, 148, 64, 0.31)" : "none"};
          margin: 0 auto 0 auto;
          font-size: 1.2rem;
        }

        .box.listPage {
          max-width: 640px;
          margin: 10px auto 0 auto;
        }
        @media ${theme.mediaQuery.s} {
          .box.listPage {
            padding: ${theme.space.layoutPadding.s};
          }
        }
        @media ${theme.mediaQuery.m} {
          .box.listPage  {
            padding: ${theme.space.layoutPadding.m};
          }
        }
        @media ${theme.mediaQuery.l} {
          .box.listPage  {
            padding: ${theme.space.layoutPadding.l};
          }
        }
        .avatarBox :global(img) {
          margin-bottom: 0px;
        }
        .siteTitleBox {
          margin-top: 10px;
          background-color: ${showLayout ? "rgba(64, 48, 64, 0.31)" : "none"};
        }
        .box :global(.siteTitle) {
          color: ${theme.main.colors.title};
          font-size: 1.4rem;
          font-weight: 400;
          display: inline-block;
        }
        .box :global(a) {
          box-shadow: none;
          display: inline-block;
        }
        .box :global(a:hover) {
          text-decoration: underline;
        }

        .box :global(.avatar) {
      /*     borderRadius: 65% 75%; */
          border: 1px solid #ddd;
          width: 64px;
          height: 64px;
          background-color: ${showLayout ? "rgba(64, 48, 64, 0.31)" : "none"};
        }
        :global(.svg) {
          width: 40px;
          height: 40px;
/*           fill: ${theme.info.colors.socialIcons}; */
          transition: all .5s;
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
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

LayoutHeader.propTypes = {
  config: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  showLayout: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  isWideScreen: isWideScreenSelector(state),
  showLayout: state.layout.showLayout,
  //navigatorPosition: state.navigatorPosition,
  //navigatorShape: state.navigatorShape,
  //categoryFilter: state.categoryFilter,
})

export default connect(mapStateToProps)(LayoutHeader)
