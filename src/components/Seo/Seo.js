import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import avatar from "../../../static/new-avatar.png"

const Seo = props => {
  const { data, config } = props
  const { facebook } = config
  const postTitle = ((data || {}).frontmatter || {}).title
  const postDescription = ((data || {}).frontmatter || {}).description
  const postCover = ((data || {}).frontmatter || {}).cover
  const postSlug = ((data || {}).fields || {}).slug || ""

  const title = postTitle ? `${postTitle} - ${config.shortSiteTitle}` : config.siteTitle
  const description = postDescription ? postDescription : config.siteDescription
  const siteImage = postCover ? postCover : config.siteImage
  const url = config.siteUrl + config.pathPrefix + postSlug

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#",
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={avatar} />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content={facebook.appId} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.authorTwitterAccount ? config.authorTwitterAccount : ""}
      />
      <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding|Roboto" rel="stylesheet"/>

      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"/>
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"/>
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="/favicon/manifest.json"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#ffffff"/>
    </Helmet>
  )
}

Seo.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default Seo
