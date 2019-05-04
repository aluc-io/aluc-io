import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'

import Search from '_src/components/Search'
import Seo from '_src/components/Seo'

import Layout from '../components/layout'
import LayoutHeader from '../components/LayoutHeader'
import config from '_config/meta'

class SearchPage extends React.Component {
  render() {
    const siteMetadata = get(this.props, 'data.site.siteMetadata')
    const { location } = this.props

    return (
      <Layout location={location}>
        <Seo config={config}/>
        <LayoutHeader location={location} config={config}/>
        <Search siteMetadata={siteMetadata} />
      </Layout>
    )
  }
}

export default SearchPage

SearchPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export const query = graphql`
  query AlgoliaQuery {
    site {
      siteMetadata {
        siteUrl
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`
