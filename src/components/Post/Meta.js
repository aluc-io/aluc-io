import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import FaCalendar from "react-icons/lib/fa/calendar"
import FaUser from "react-icons/lib/fa/user"
import FaTag from "react-icons/lib/fa/tag"

import theme from "_src/theme/theme.yaml"

const Meta = props => {
  const { prefix, authorName, category, showLayout } = props

  return (
    <p className="meta">
      <span>
        <FaCalendar size={18} /> {prefix}
      </span>
      <span>
        <FaUser size={18} /> {authorName}
      </span>
      {category && (
        <span>
          <FaTag size={18} />
          <Link to={`/category/${category}`}>{category}</Link>
        </span>
      )}

      <style jsx>{`
        .meta {
          margin: ${theme.space.m} 0;
          background: ${showLayout ? 'rgba(75, 0, 130, 0.18)' : 'transparent'};
          :global(svg) {
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }

          span {
            margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
            background: ${showLayout ? 'rgba(75, 0, 130, 0.21)' : 'transparent'};
          }
        }
        @from-width tablet {
          .meta {
            margin: ${`calc(${theme.space.m} * 1.5) 0 ${theme.space.m}`};
          }
        }
      `}</style>
      <style jsx>{`
        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          transition: all .3s;

          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
          }
        }
      `}</style>
    </p>
  )
}

Meta.propTypes = {
  prefix: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  category: PropTypes.string,
  showLayout: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default connect(mapStateToProps)(Meta)
