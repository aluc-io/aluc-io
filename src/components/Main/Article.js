import React from "react";
import PropTypes from "prop-types";

import theme from "_src/theme/theme.yaml"

          /* margin: ${canRenderTOC ? '0px 0px 0px 150px' : '0 auto'}; */
const Article = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <article className="articleBox">{children}</article>

      {/* --- STYLES --- */}
      <style jsx>{`
        .articleBox {
          padding: ${theme.space.inset.xs};
          margin: 0 auto;
          background-color: yellow;
        }
        @from-width m {
          .articleBox {
            padding: ${`calc(${theme.space.s}) calc(${theme.space.s})`};
          }
        }
        @from-width l {
          .articleBox {
            padding: ${`calc(${theme.space.default} * 2) 0 calc(${
              theme.space.default
            })`};
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Article.propTypes = {
  canRenderTOC: PropTypes.isRequired,
  children: PropTypes.node.isRequired,
};

export default Article;
