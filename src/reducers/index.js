import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import bookCardReducer from './bookCardReducer';

export default combineReducers({
  books: booksReducer,
  bookCard: bookCardReducer
});
