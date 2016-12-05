import { combineReducers } from 'redux';
import auth from './auth_reducer'
import books from './books'


const rootReducer = combineReducers({
  auth,
  books
});

export default rootReducer;
