import React from "react"
import PropTypes from "prop-types"

import Footnote from "./Footnote"
import theme from "_src/theme/theme.yaml"


const Footer = props => {
  const { footnote } = props;
  const { html } = footnote;

  return (
    <footer>
      <Footnote content={html} />
      <style jsx>{`
        footer {
          color: ${theme.main.colors.footer};
          padding: 1.5rem 1.5rem  calc(60px + 1.5rem) 1.5rem;
        }
        footer p {
          margin: 0;
        }

        @media ${theme.mediaQuery.m} {
          footer {
            padding: 2rem 2.5rem  calc(60px + 2rem) 2.5rem;
          }
        }
        @media ${theme.mediaQuery.l} {
          footer {
            padding: 2rem 3rem 2rem 3rem;
          }
        }
      `}</style>
    </footer>
  );
};

Footer.propTypes = {
  footnote: PropTypes.object.isRequired
};

export default Footer
