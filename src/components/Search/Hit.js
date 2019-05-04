import React from "react"
import PropTypes from "prop-types"
import compact from "lodash/compact"
import cx from 'classnames'
import { Link } from "gatsby"

import theme from '_src/theme/theme.yaml'

const Hit = props => {
  const { hit, siteUrl, showLayout } = props;

  let content = ((hit._highlightResult.text || {}).value || "").trim();
  const matcher = /(?!`!.*)<ais-highlight-\d+?>(.*?)<\/ais-highlight-\d+?>(?!.*!`)/;
  const matched = content.match(matcher);
  const isMatchFirst = !!(matched && matched.index === 0);
  const contentList = compact(content.split(matcher));
  const highlightCondition = isMatchFirst ? idx => !(idx % 2) : idx => idx % 2;

  const ContentElList = contentList.map((text, i) => {
    if (highlightCondition(i)) {
      // even
      return <span key={i} className={cx('content','highlight')}>{text}</span>;
    } else {
      // odd
      return <span key={i} className='content'>{text}</span>;
    }
  });

  const link = { __html: siteUrl + hit.fields.slug + hit._highlightResult.slug.value.trim() };
  const title = { __html: hit.frontmatter.title.trim() };
  const href = hit.fields.slug + '#' + hit.slug;
  return (
    <div className='linkBox'>
      <Link to={href}>
        <div className={'title'} dangerouslySetInnerHTML={title}/>
        <div className={'link'} dangerouslySetInnerHTML={link}/>
        {ContentElList}
      </Link>
      <style jsx global>{`
        .ais-Hits-item {
          position: relative;
          font-size: 1.2em;
          display: block;
          width: 100%;
          color: #666;
          line-height: 1;
        }
        .ais-Hits-item:before {
          content: "•";
          position: absolute;
          top: 0.5em;
          left: 0.1em;
          color: ${theme.main.colors.link};
        }
      `}</style>
      <style jsx>{`
        .linkBox :global(span.content) {
          background-color: ${showLayout ? 'ivory' : 'initial'};
        }
        .linkBox :global(a) {
          background-color: ${showLayout ? 'rgba(0, 0, 255, 0.39)' : 'initial'};
          box-shadow: none;
        }
        .linkBox :global(a:hover) {
          text-decoration: underline;
        }
      `}</style>
      <style jsx>{`
        .linkBox {
          padding: .5em 0 1em 1em;
          position: relative;
          font-size: 1.2em;
          display: block;
          width: 100%;
          color: #666;
        }
        .linkBox :global(a) {
          text-shadow: none;
          
        }
        .linkBox :global(span) {
          font-weight: 300;
          display: block;
          font-size: .9em;
          margin: 2em 0 0 0;
        }
        .linkBox :global(span.content) {
          font-size: .8rem;
          letter-spacing: normal;
          display: inline;
          text-shadow: none;
          text-decoration: none;
        }
        .linkBox :global(.highlight.content) {
          color: red;
        }
        .link {
          font-size: 12px;
          margin: 0 0 4px 0px;
          color: hsl(79.5, 60%, 34.9%);
        }
        .title {
          font-size: 15px;
          margin: 0 0 4px 0px;
        }
      `}</style>
    </div>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  siteUrl: PropTypes.string.isRequired,
  showLayout: PropTypes.bool.isRequired,
};

export default Hit
