import { combineReducers } from 'redux';
import auth from './auth_reducer'
import books from './books'
import kindergarten from './kindergarten'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'


const rootReducer = combineReducers({
  auth,
  books,
  cart,
  products,
  kindergarten
});

export const getAddedCart = state => state.cart.selectedGoods
export const getCartProducts = state => state.cart.addedIds



export default rootReducer;
