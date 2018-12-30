import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from '../modules/search';

import ResultsList from './ResultsList';
import SelectedBook from './SelectedBook';
import Loader from '../shared/components/Loader';
import Page from '../shared/components/Page';

import './search.css';

class Search extends Component {
  searchWithTimeout = e => {
    const { search } = this.props;
    const query = e.target.value;

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => search(query), 300);
  };

  render() {
    const { results, query, selected, isSearching } = this.props;

    return (
      <Page>
        <h1>Add Books</h1>

        <input
          type="text"
          onChange={this.searchWithTimeout}
          className="search-box"
        />

        {isSearching && <Loader />}

        {selected && <SelectedBook book={selected} />}

        {!selected && !isSearching && (
          <ResultsList results={results} query={query} />
        )}
      </Page>
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
