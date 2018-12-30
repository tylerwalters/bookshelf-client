import axios from 'axios';

import { apiUrl } from '../shared/utils/api';

export const FETCHING_BOOKS = 'books/FETCHING_BOOKS';
export const FETCHING_BOOKS_FAILED = 'books/FETCHING_BOOKS_FAILED';
export const ADD_BOOKS = 'books/ADD_BOOKS';

const initialState = {
  books: [],
  fetchingBooks: false,
  fetchingBooksFailed: false
};

export default (state = initialState, action) => {
  const resetState = {
    ...state,
    fetchingBooks: false,
    fetchingBooksFailed: false
  };

  switch (action.type) {
    case FETCHING_BOOKS:
      return {
        ...resetState,
        fetchingBooks: true
      };
    case ADD_BOOKS:
      return {
        ...resetState,
        books: action.books
      };
    case FETCHING_BOOKS_FAILED:
      return {
        ...resetState,
        fetchingBooksFailed: true
      };
    default:
      return state;
  }
};

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCHING_BOOKS
    });

    const token = getState().user.token;
    const url = `${apiUrl}/books?access_token=${token}`;

    return axios
      .get(url)
      .then(res => {
        const books = res.data;

        dispatch({
          type: ADD_BOOKS,
          books
        });
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          dispatch({
            type: FETCHING_BOOKS_FAILED
          });
        }
      });
  };
};
