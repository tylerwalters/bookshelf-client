import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBooks } from '../modules/books';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Collapse from '@material-ui/core/Collapse';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import Page from '../shared/components/Page';
import BookList from './BookList';
import Pagination from '../shared/components/Pagination';

import './home.css';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  textField: {
    width: '100%'
  },
  expand: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  filterActions: {
    backgroundColor: '#eaeaea',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '20px'
  },
  filterSection: {
    padding: '20px',
    backgroundColor: '#f1f1f1'
  },
  filterByQuery: {
    display: 'flex'
  },
  termRadioGroup: {
    margin: '-5px 20px 0'
  },
  termRadioLabel: {
    padding: 0
  },
  termRadioRadio: {
    padding: '5px 10px'
  },
  filterSelects: {
    display: 'flex'
  },
  categoryFormControl: {
    marginLeft: '5px',
    minWidth: '18%'
  },
  genreFormGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  genreLabel: {
    margin: '0 0 0 -14px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  }
});

class Home extends Component {
  state = {
    query: '',
    filteredBooks: null,
    filterBy: 'author',
    showFilters: false,
    showCategories: false,
    categories: [],
    genres: {},
    selectedCategory: 'all',
    page: 1
  };

  componentWillMount() {
    this.props.fetchBooks();
  }

  componentDidUpdate(prevProps) {
    const { books } = this.props;

    if (books.length > 0 && prevProps.books.length === 0) {
      this.updateBooks();
    }
  }

  updatePage = page => this.setState({ page });

  setFilterBy = e =>
    this.setState(
      { filterBy: e.target.value, filteredBooks: null },
      this.updateBooks
    );

  setSelectedCategory = e =>
    this.setState(
      { selectedCategory: e.target.value, filteredBooks: null },
      this.updateBooks
    );

  setQuery = e => {
    const query = e.target.value;
    this.setState({ query }, () => {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => this.updateBooks(), 300);
    });
  };

  setGenre = value => {
    const { genres } = this.state;
    const updatedGenres = { ...genres };

    updatedGenres[value] = !genres[value];

    this.setState({ genres: updatedGenres }, this.updateBooks);
  };

  toggleFilters = () => this.setState({ showFilters: !this.state.showFilters });

  toggleCategories = () => {
    if (this.state.categories.length < 1) this.updateCategories();

    this.setState({ showCategories: !this.state.showCategories });
  };

  updateBooks = () => {
    const { books } = this.props;
    const { query, filterBy, selectedCategory, genres } = this.state;
    const sortedBooks = this.sortAlphabetically(books);
    console.log('sortedBooks.length: ', sortedBooks.length);

    const filteredBooksByQuery = this.filterByQuery(
      sortedBooks,
      query,
      filterBy
    );
    console.log('filteredBooksByQuery.length: ', filteredBooksByQuery.length);

    const filtedBooksByCategory = this.filterByCategory(
      filteredBooksByQuery,
      selectedCategory
    );
    console.log('filtedBooksByCategory.length: ', filtedBooksByCategory.length);

    const filterBooksByGenre = this.filterByGenre(
      filtedBooksByCategory,
      genres
    );
    console.log('filterBooksByGenre.length: ', filterBooksByGenre.length);
    console.log('------------');

    this.setState({ filteredBooks: filterBooksByGenre });
  };

  filterByGenre = (books, genres) => {
    const selectedGenres = Object.keys(genres).filter(genre => genres[genre]);

    if (selectedGenres.length < 1) return books;

    return books.filter(
      book =>
        book.categories &&
        book.categories.filter(
          selectedCategory => -1 !== selectedGenres.indexOf(selectedCategory)
        ).length > 0
    );
  };

  filterByQuery = (books, query, filterBy) => {
    if (!query) return books;

    const filteredBooks = books.filter(book => {
      if (filterBy === 'author') {
        return (
          book.authors.filter(author => author.toLowerCase().includes(query))
            .length > 0
        );
      } else {
        return book.title.toLowerCase().includes(query);
      }
    });

    return filteredBooks;
  };

  filterByCategory = (books, selectedCategory) => {
    const fictionCategories = [
      'Fiction',
      'Poetry',
      'Dystopias',
      'Literary Collections',
      'Juvenile Fiction',
      'Young Adult Fiction',
      'American fiction',
      'Fantasy fiction',
      'English fiction',
      'Drama',
      'Classical fiction',
      "Children's poetry",
      'Vampires',
      'Detective and mystery stories',
      'Comics & Graphic Novels',
      'Short stories, American'
    ];

    if (selectedCategory === 'fiction')
      return books.filter(
        book =>
          book.categories &&
          book.categories.filter(
            selectedCategory =>
              -1 !== fictionCategories.indexOf(selectedCategory)
          ).length > 0
      );

    if (selectedCategory === 'nonfiction')
      return books.filter(
        book =>
          book.categories &&
          book.categories.filter(
            selectedCategory =>
              -1 !== fictionCategories.indexOf(selectedCategory)
          ).length < 1
      );

    return books;
  };

  sortAlphabetically = books =>
    books.sort((a, b) => {
      const firstLastName = this.getLastName(a.authors[0]);
      const secondLastName = this.getLastName(b.authors[0]);

      if (firstLastName < secondLastName) {
        return -1;
      }
      if (firstLastName > secondLastName) {
        return 1;
      }
      return 0;
    });

  getLastName = name => {
    const [lastName] = name.split(' ').slice(-1);
    return lastName;
  };

  getBooksByTitle = (books, title, fields) => {
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(title)
    );

    if (!fields) return filteredBooks;

    return filteredBooks.map(book => {
      const editedBook = {};
      fields.forEach(field => (editedBook[field] = book[field]));
      return editedBook;
    });
  };

  getCurrentPageBooks = (books, size = 12) => {
    const { page } = this.state;

    const start = size * page - size;
    const end = start + size;

    const currentBooks = books.slice(start, end);

    return currentBooks;
  };

  updateCategories = () => {
    const { filteredBooks } = this.state;
    const allCategories = filteredBooks
      .map(book => book.categories)
      .flat()
      .filter(category => !!category);
    const uniqueCategories = [...new Set(allCategories)];
    const sortedCategories = uniqueCategories.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    this.setState({ categories: uniqueCategories });
  };

  render() {
    const {
      query,
      filteredBooks,
      filterBy,
      categories,
      genres,
      selectedCategory,
      showFilters,
      showCategories,
      page
    } = this.state;
    const { classes } = this.props;
    const books = filteredBooks || this.sortAlphabetically(this.props.books);
    const currentBooks = this.getCurrentPageBooks(books);

    // console.log('books.length: ', books.length);

    return (
      <Page>
        <Typography component="h1" variant="h2">
          Our Books
        </Typography>

        <div className={classes.filterActions} onClick={this.toggleFilters}>
          {showFilters ? <span>Hide filters</span> : <span>Show filters</span>}
          {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        <Collapse
          in={showFilters}
          timeout="auto"
          unmountOnExit
          className={classes.filterSection}
        >
          <div className={classes.filterByQuery}>
            <TextField
              id="filter-books"
              className={classNames(classes.margin, classes.textField)}
              variant="filled"
              label="Filter Books by Term"
              value={query}
              onChange={this.setQuery}
            />

            <RadioGroup
              aria-label="Filter By"
              name="filterBy"
              className={classes.termRadioGroup}
              value={filterBy}
              onChange={this.setFilterBy}
            >
              <FormControlLabel
                value="author"
                control={<Radio className={classes.termRadioRadio} />}
                label="Author"
                className={classes.termRadioLabel}
              />
              <FormControlLabel
                value="title"
                control={<Radio className={classes.termRadioRadio} />}
                label="Title"
                className={classes.termRadioLabel}
              />
            </RadioGroup>
          </div>

          <div className={classes.filterSelects}>
            <FormControl
              component="fieldset"
              className={classNames(
                classes.formControl,
                classes.categoryFormControl
              )}
            >
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                aria-label="Category"
                name="category"
                className={classes.group}
                value={selectedCategory}
                onChange={this.setSelectedCategory}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />

                <FormControlLabel
                  value="fiction"
                  control={<Radio />}
                  label="Fiction"
                />

                <FormControlLabel
                  value="nonfiction"
                  control={<Radio />}
                  label="Nonfiction"
                />
              </RadioGroup>
            </FormControl>

            <div className={classes.categoriesContainer}>
              <div
                className={classes.filterActions}
                onClick={this.toggleCategories}
              >
                {showCategories ? (
                  <span>Hide categories</span>
                ) : (
                  <span>Show categories</span>
                )}
                {showCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>

              <Collapse
                in={showCategories}
                timeout="auto"
                unmountOnExit
                className={classes.filterSection}
              >
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Genre</FormLabel>
                  <FormGroup className={classes.genreFormGroup}>
                    {categories.map(category => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Checkbox
                            checked={genres[category]}
                            onChange={() => this.setGenre(category)}
                          />
                        }
                        label={category}
                        className={classes.genreLabel}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Collapse>
            </div>
          </div>
        </Collapse>

        <p className="count">Total books: {books.length}</p>

        <BookList books={currentBooks} />

        <Pagination
          total={books.length}
          size={12}
          current={page}
          handleClick={this.updatePage}
        />
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
