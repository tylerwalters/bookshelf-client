import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from '../modules/search';

import './home.css';

class Home extends Component {
  searchWithTimeout = e => {
    const { search } = this.props;
    const query = e.target.value;

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => search(query), 500);
  };

  render() {
    return (
      <div id="Home">
        <h1>Books</h1>

        <input
          type="text"
          onChange={this.searchWithTimeout}
          className="search-box"
        />
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
)(Home);
