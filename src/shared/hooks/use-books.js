import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { GlobalContext } from '../context/global';

import useAuthentication from './use-authentication';

import { API_URL } from '../constants/api';
import { BOOKS_PER_PAGE } from '../constants/preferences';

function useBooks() {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [sort, setSort] = useState('author');
  const [skip, setSkip] = useState(null);
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('author');
  const { isLoggedIn, token } = useAuthentication();

  function createFieldsQuery() {
    const fields = ['id', 'title', 'authors', 'imageLinks'];
    const query = fields.reduce(
      (query, field) => `${query}&filter[fields][${field}]=true`,
      ''
    );

    return query;
  }

  function createPaginationQuery() {
    const limitQuery = `filter[limit]=${BOOKS_PER_PAGE}`;
    const skipQuery = skip ? `&filter[skip]=${skip}` : '';

    return `${limitQuery}${skipQuery}`;
  }

  function createSortQuery() {
    const sortBy = sort === 'title' ? 'title' : 'authorLastName';
    return 'filter[order]=authorLastName%20ASC';
  }

  function createSearchQuery(useFilter = true) {
    if (!query) return null;
    const field = searchBy === 'author' ? 'authors' : 'title';
    return `${
      useFilter ? 'filter[where]' : 'where'
    }[${field}][regexp]=/${query}/i`;
  }

  function fetchBooks() {
    const path = '/books';
    const queries = [
      createFieldsQuery(),
      createPaginationQuery(),
      createSortQuery(),
      createSearchQuery(),
      `access_token=${globalState.auth.token}`
    ];
    const url = `${API_URL}/${path}?${queries.filter(Boolean).join('&')}`;

    axios.get(url).then(res => {
      setGlobalState(curr => ({ ...curr, books: res.data }));
    });

    updateCount();
  }

  function updateCount() {
    const path = 'books/count';
    const queries = [
      createSearchQuery(false),
      `access_token=${globalState.auth.token}`
    ];
    const url = `${API_URL}/${path}?${queries.filter(Boolean).join('&')}`;

    axios.get(url).then(res => {
      setGlobalState(curr => ({ ...curr, count: res.data.count }));
    });
  }

  function addAuthorLastName() {
    const path = '/books';
    const queries = [
      'filter[fields][id]=true&filter[fields][authors]=true',
      `access_token=${globalState.auth.token}`
    ];
    const url = `${API_URL}/${path}?${queries.filter(Boolean).join('&')}`;

    axios.get(url).then(res => {
      const { data } = res;
      const authorLastNames = data.forEach(book => {
        book.authorLastName = book.authors
          .slice(-1)
          .pop()
          .split(' ')
          .slice(-1)
          .join(' ');
        patchAuthorLastName(book.id, book.authorLastName);
      });
    });
  }

  async function patchAuthorLastName(id, authorLastName) {
    await axios
      .patch(`${API_URL}/books/${id}?access_token=${globalState.auth.token}`, {
        authorLastName: authorLastName
      })
      .catch(err => console.error(err));
  }

  function addBook(book) {
    const path = `/books`;
    const query = `access_token=${globalState.auth.token}`;
    const url = `${API_URL}/${path}?${query}`;

    axios.post(url, book).catch(err => console.error(err));
  }

  function removeBook(id) {
    const path = `/books/${id}`;
    const query = `access_token=${globalState.auth.token}`;
    const url = `${API_URL}/${path}?${query}`;

    axios
      .delete(url)
      .then(() => fetchBooks())
      .catch(err => console.error(err));
  }

  function searchBookOnGoogle(query) {
    const queries = [`q=title:${encodeURIComponent(query)}`];
    const url = `https://www.googleapis.com/books/v1/volumes?${queries
      .filter(Boolean)
      .join('&')}`;

    axios
      .get(url)
      .then(res => {
        const searchedBooks = res.data.items.map(item => ({
          ...item.volumeInfo,
          googleId: item.id
        }));
        setGlobalState({ ...globalState, searchedBooks });
      })
      .catch(err => console.error(err));
  }

  useEffect(fetchBooks, [query, searchBy, skip]);

  return {
    books: globalState.books,
    count: globalState.count,
    searchedBooks: globalState.searchedBooks,
    fetchBooks,
    setSort,
    setSkip,
    setQuery,
    setSearchBy,
    addBook,
    removeBook,
    searchBookOnGoogle
  };
}

export default useBooks;
