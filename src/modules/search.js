import axios from 'axios';

import { apiUrl } from '../shared/utils/api';

export const SEARCH_REQUESTED = 'search/SEARCH_REQUESTED';
export const UPDATE_RESULTS = 'search/UPDATE_RESULTS';
export const UPDATE_SELECTED_STATUS = 'search/UPDATE_SELECTED_STATUS';

const initialState = {
  query: '',
  selected: null,
  results: [],
  isSearching: false
};

export default (state = initialState, action) => {
  const resetState = {
    ...state,
    isSearching: false
  };

  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...resetState,
        query: action.query,
        selected: null,
        isSearching: true
      };

    case UPDATE_RESULTS:
      return {
        ...resetState,
        results: action.results
      };

    case UPDATE_SELECTED_STATUS:
      return {
        ...resetState,
        results: [],
        selected: action.selected
      };

    default:
      return state;
  }
};

export const search = query => {
  return dispatch => {
    dispatch({
      type: SEARCH_REQUESTED,
      query: query
    });

    if (!query) {
      dispatch({
        type: UPDATE_RESULTS,
        results: []
      });
    } else {
      const url = `https://www.googleapis.com/books/v1/volumes?q=title:${encodeURIComponent(
        query
      )}`;

      axios.get(url).then(res => {
        const books = res.data.items.map(item => ({
          ...item.volumeInfo,
          googleId: item.id
        }));

        dispatch({
          type: UPDATE_RESULTS,
          results: books
        });
      });
    }
  };
};

export const addBook = book => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SELECTED_STATUS,
      selected: { ...book, status: 'Saving book...' }
    });

    const token = getState().user.token;
    const url = `${apiUrl}/books?access_token=${token}`;

    axios
      .post(url, book)
      .then(res => {
        dispatch({
          type: UPDATE_SELECTED_STATUS,
          selected: { ...book, status: 'Book saved!' }
        });
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          dispatch({
            type: UPDATE_SELECTED_STATUS,
            selected: { ...book, status: 'Failed to save!' }
          });
        }
      });
  };
};
