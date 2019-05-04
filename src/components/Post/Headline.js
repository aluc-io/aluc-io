import React from "react"
import PropTypes from "prop-types"

const Headline = props => {
  const { title, theme } = props

  return (
    <React.Fragment>
      <h1>{title}</h1>

      {/* --- STYLES --- */}
      <style jsx>{`
        h1 {
          color: ${theme.main.colors.title};
          font-size: ${theme.font.size.xxl};
          margin: ${theme.space.stack.l};
          animation-name: headlineEntry;
          animation-duration: ${theme.time.duration.long};
          font-weight: 700;
        }

        @keyframes headlineEntry {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          h1 {
            font-size: ${`calc(${theme.font.size.m} * 1.2)`};
          }
        }

        @from-width desktop {
          h1 {
            font-size: ${`calc(${theme.font.size.m} * 1.4)`};
          }
        }
      `}</style>
    </React.Fragment>
  )
}

Headline.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default Headline

