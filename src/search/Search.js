import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from '../modules/search';

import ResultsList from './ResultsList';
import SelectedBook from './SelectedBook';

import './search.css';

class Search extends Component {
  searchWithTimeout = e => {
    const { search } = this.props;
    const query = e.target.value;

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => search(query), 500);
  };

  render() {
    const { results, query, selected } = this.props;

    return (
      <div id="Search">
        <h1>Add Books</h1>

        <input
          type="text"
          onChange={this.searchWithTimeout}
          className="search-box"
        />

        {selected ? (
          <SelectedBook book={selected} />
        ) : (
          <ResultsList results={results} query={query} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.search.results,
  query: state.search.query,
  selected: state.search.selected,
  isSearching: state.search.isSearching
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
