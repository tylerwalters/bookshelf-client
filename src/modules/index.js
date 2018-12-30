import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './search';
import user from './user';
import books from './books';

export default combineReducers({
  routing: routerReducer,
  search,
  user,
  books
});
