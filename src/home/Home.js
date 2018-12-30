import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBooks } from '../modules/books';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Page from '../shared/components/Page';

import './home.css';

const styles = theme => ({
  textField: {
    width: '100%'
  }
});

class Home extends Component {
  state = {
    filteredBooks: null
  };

  componentWillMount() {
    this.props.fetchBooks();
  }

  filterBooks = e => {
    const term = e.target.value.toLowerCase();
    const { books } = this.props;
    const sortedBooks = this.sortAlphabetical(books);

    if (term) {
      const filteredBooks = sortedBooks.filter(book =>
        book.title.toLowerCase().includes(term)
      );
      this.setState({ filteredBooks });
    } else {
      this.setState({ filteredBooks: sortedBooks });
    }
  };

  sortAlphabetical = books =>
    books.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

  render() {
    const { filteredBooks } = this.state;
    const { classes } = this.props;
    const books = filteredBooks || this.sortAlphabetical(this.props.books);

    return (
      <Page>
        <Typography component="h1" variant="h2">
          Our Books
        </Typography>

        <TextField
          id="filter-books"
          className={classNames(classes.margin, classes.textField)}
          variant="filled"
          label="Filter Books"
          onChange={this.filterBooks}
        />

        <div className="count">Total books: {books.length}</div>

        {books.map(book => (
          <div key={book.title}>{book.title}</div>
        ))}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.books
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBooks
    },
    dispatch
  );

const HomeWithStyles = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeWithStyles);
