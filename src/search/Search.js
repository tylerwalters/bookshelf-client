import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

import { search, clearSearch } from '../modules/search';
import ResultsList from './ResultsList';
import SelectedBook from './SelectedBook';
import Loader from '../shared/components/Loader';
import Page from '../shared/components/Page';

import './search.css';

const styles = theme => ({
  textField: {
    width: '100%'
  }
});

class Search extends Component {
  state = {
    query: ''
  };

  searchWithTimeout = e => {
    const { search } = this.props;
    const query = e.target.value;

    this.setState({ query }, () => {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => search(query), 300);
    });
  };

  clearQuery = () => {
    const { clearSearch } = this.props;

    this.setState({ query: '' }, () => {
      clearSearch();
      this.textField.focus();
    });
  };

  render() {
    const { results, selected, isSearching, classes } = this.props;
    const { query } = this.state;

    return (
      <Page>
        <h1>Add Books</h1>

        <TextField
          inputRef={field => (this.textField = field)}
          id="search-books"
          className={classNames(classes.margin, classes.textField)}
          variant="filled"
          label="Search Books"
          value={query}
          autoFocus
          onChange={this.searchWithTimeout}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Clear query" onClick={this.clearQuery}>
                  {<Clear />}
                </IconButton>
              </InputAdornment>
            )
          }}
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
      search,
      clearSearch
    },
    dispatch
  );

const SearchWithStyles = withStyles(styles)(Search);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchWithStyles);
