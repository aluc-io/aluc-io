import React from "react"
import PropTypes from "prop-types"

import theme from "_src/theme/theme.yaml"

const Footnote = ({ content }) => {
  return (
    <React.Fragment>
      <div className='container' dangerouslySetInnerHTML={{ __html: content }} />
      <style jsx>{`
        .container {
          text-align: right;
          font-size: ${theme.footer.fonts.footnote.size};
          line-height: ${theme.footer.fonts.footnote.lineHeight};
          color: ${theme.footer.colors.text};
        }
        .container a {
          color: ${theme.footer.colors.link};
          font-weight: normal;
          text-shadow: none;
        }
        .container a:hover {
          color: ${theme.footer.colors.linkHove};
        }
        .container ul {
          list-style: none;
          margin: 0;
          padding: 0;
          text-align: center;
        }
        .container li {
          display: inline-block;
          margin: 0 .3em;
        }
      `}</style>
    </React.Fragment>
  )
}

Footnote.propTypes = {
  content: PropTypes.string.isRequired
}

export default Footnote
