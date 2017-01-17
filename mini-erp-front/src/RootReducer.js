import { combineReducers } from 'redux';
import cart from './Shop/reducers/cart'
import books from './Shop/reducers/books'
import auth from './Auth/reducers'

const rootReducer = combineReducers({
  auth,
  books,
  cart
  // products,
  // kindergarten,
  // invoices
});


export default rootReducer;
