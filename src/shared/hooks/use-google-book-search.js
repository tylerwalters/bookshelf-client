import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { GlobalContext } from '../context/global';

import { BOOKS_PER_PAGE } from '../constants/preferences';

function useGoogleBookSearch() {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [skip, setSkip] = useState(null);
  const [query, setQuery] = useState('');

  function createPaginationQuery() {
    const skipQuery = skip ? `startIndex=${skip}` : '';

    return skipQuery;
  }

  function searchBooks() {
    if (!query)
      return void setGlobalState({
        ...globalState,
        searchedBooks: null,
        searchedBooksCount: 0
      });

    const queries = [
      `q=title:${encodeURIComponent(query)}`,
      `maxResults=${BOOKS_PER_PAGE}`,
      createPaginationQuery()
    ];
    const url = `https://www.googleapis.com/books/v1/volumes?${queries
      .filter(Boolean)
      .join('&')}`;

    axios
      .get(url)
      .then(res => {
        const searchedBooksCount = res.data.totalItems;
        const searchedBooks = Array.isArray(res.data.items)
          ? res.data.items.map(item => ({
              ...item.volumeInfo,
              googleId: item.id
            }))
          : [];
        setGlobalState({ ...globalState, searchedBooks, searchedBooksCount });
      })
      .catch(err => console.error(err));
  }

  useEffect(searchBooks, [query, skip]);

  return {
    searchedBooks: globalState.searchedBooks,
    searchedBooksCount: globalState.searchedBooksCount,
    setQuery,
    setSkip,
    searchBooks
  };
}

export default useGoogleBookSearch;
