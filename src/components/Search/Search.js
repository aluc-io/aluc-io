import { connect } from 'react-redux'
import React from "react"
import PropTypes from "prop-types"
import { InstantSearch, SearchBox, Hits, Stats, Pagination } from "react-instantsearch/dom"

import injectSheet from "react-jss"

import Hit from "./Hit"

const Search = props => {
  const { siteMetadata, showLayout } = props
  const { algolia, siteUrl } = siteMetadata
  const HitRapper = (p) =>
    <div><Hit showLayout={showLayout} hit={p.hit} siteUrl={siteUrl}/></div>

  return (
    <div className='box'>
      {algolia && algolia.appId && (
        <InstantSearch
          appId={algolia.appId}
          apiKey={algolia.searchOnlyApiKey}
          indexName={algolia.indexName}
        >
          <SearchBox translations={{ placeholder: "Search" }} />
          <Stats />
          <Hits hitComponent={HitRapper} />
          <Pagination />
        </InstantSearch>
      )}
      <style jsx>{`
        margin-top: 60px;
      `}</style>
      <style jsx global>{`
        .ais-SearchBox {
          width: 100%;
        }
        .ais-SearchBox-form {
          position: relative;
          border-bottom: 1px solid #aaa;
          display: flex;
          justify-content: space-between;
        }
        .ais-SearchBox-input {
          border: none;
          padding: 0.2em;
          font-size: 1.4em;
          flex-grow: 1;
        }
        .ais-SearchBox-submit,
        .ais-SearchBox-reset {
          background: none;
          border: none;
          fill: #666;
          flex-grow: 0;
        }
        .ais-Stats {
          margin: 0.5em 0 2em 0.3em;
          font-size: 0.9em;
          color: #999;
          display: block;
        }
        .ais-Hits-list {
          list-style: none;
          padding: 0;
        }
        .ais-Pagination-list {
          display: flex;
          list-style: none;
          justify-content: center;
          padding: 0;
        }
        .ais-Pagination-item a,
        .ais-Pagination-item span {
          color: #666;
          font-size: 1.2em;
          display: block;
          padding: 0.5em 0.5em 2em;
        }
        .ais-Pagination-item a:hover {
          color: red;
        }
        .ais-Pagination-item.ais-Pagination-item--firstPage a,
        .ais-Pagination-item.ais-Pagination-item--previousPage a,
        .ais-Pagination-item.ais-Pagination-item--nextPage a {
          padding: 0.4em 0.5em 0.6em;
        }
      `}</style>
    </div>
  )
}

Search.propTypes = {
  siteMetadata: PropTypes.object.isRequired,
  showLayout: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    showLayout: state.layout.showLayout,
    //fontSizeIncrease: state.fontSizeIncrease,
  }
}

export default connect(mapStateToProps)(Search)
