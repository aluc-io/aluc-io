import React from "react";
import PropTypes from "prop-types";

//import asyncComponent from "_src/components/AsyncComponent";
import { asyncComponent } from 'react-async-component';

import theme from "_src/theme/theme.yaml"

const PostShare = asyncComponent({
  resolve: () => import('./PostShare'),
  LoadingComponent: () => <div>Loading</div>, // Optional
  ErrorComponent: ({ error }) => <div>{error.message}</div>, // Optional
})

const GITHUB_NAMESPACE = "b6pzeusbc54tvhw5jgpyw8pwz2x6gs";
const GITHUB_REPO_COMMENTS = "react-utterances-demo-comment";
const GITHUB_REPO_REACT_UTTERANCES = "react-utterances";
const GITHUB_URL_REACT_UTTERANCES = `https://github.com/${GITHUB_NAMESPACE}/${GITHUB_REPO_REACT_UTTERANCES}`;


import ReactUtterences from 'react-utterances'

const PostFooter = ({ author, post, slug, facebook }) => {

  const specificTerm = ''
  const type = specificTerm ? 'issue-term' : 'pathname'

  return (
    <footer className={'footer'}>
      <PostShare post={post} slug={slug} />
      <div className='postComments'>
        <ReactUtterences
          repo={process.env.ALUCIO_UTTERANCES_REPO}
          specificTerm={specificTerm}
          type={type}
        />
      </div>
      <style jsx>{`
        footer {
          color: ${theme.main.colors.footer};
          font-size: ${theme.main.fonts.footer.size}em;
          line-height: ${theme.main.fonts.footer.lineHeight};
        }
        footer p {
          margin: 0;
        }
        .postComments {
          margin: 3em 0 0;
          padding: 3em 0 0;
          border-top: 1px solid #ddd;
        }
      `}</style>
    </footer>
  );
};

PostFooter.propTypes = {
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default PostFooter
