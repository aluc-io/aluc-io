import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//import { setFontSizeIncrease } from "_src/store";
import theme from "_src/theme/theme.yaml"

const Content = props => {
  const { html, children } = props;

  return (
    <React.Fragment>
    <div 
      className={'bodytext'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
    <style jsx>{`
      .bodytext {
        animation-name: bodytextEntry;
        animation-duration: ${theme.time.duration.long};
        :global(h2), :global(h3) {
          margin: 1.5em 0 1em;
        }
        :global(h2) {
          line-height: ${theme.font.lineHeight.s};
          font-size: ${theme.font.size.l};
        }
        :global(h3) {
          font-size: ${theme.font.size.m};
          line-height: ${theme.font.lineHeight.m};
        }
        :global(p) {
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.xxl};
          margin: 0 0 1.5em;
        }
        :global(ul) {
          list-style: circle;
          margin: 0 0 1.5em;
          padding: 0 0 0 1.5em;
        }
        :global(li) {
          margin: 0.7em 0;
          line-height: 1.5;
        }
        :global(a) {
          font-weight: ${theme.font.weight.bold};
          color: ${theme.color.brand.primary};
          text-decoration: underline;
        }
        :global(a.gatsby-resp-image-link) {
          border: 0;
          display: block;
          margin: 2.5em 0;
          border-radius: ${theme.size.radius.default};
          overflow: hidden;
          border: 1px solid ${theme.line.color};
        }
        :global(code.language-text) {
          background: ${theme.color.neutral.gray.c};
          text-shadow: none;
          color: inherit;
          padding: 0.1em 0.3em 0.2em;
          border-radius: 0.1em;
        }
        :global(pre code.language-text) {
          background: initial;
        }
      }
      @keyframes bodytextEntry {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}</style>


    </React.Fragment>
  );
};

Content.propTypes = {
  html: PropTypes.string,
  children: PropTypes.node,
  //setFontSizeIncrease: PropTypes.func.isRequired,
  //fontSizeIncrease: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    //fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  //setFontSizeIncrease
};

export default connect(mapStateToProps, mapDispatchToProps)(Content)
