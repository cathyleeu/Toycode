import { combineReducers } from 'redux';
import auth from './auth_reducer'
import books from './books'
// import order from '../components/order/reducers'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'


const rootReducer = combineReducers({
  auth,
  books,
  cart,
  products
});


// const getAddedIds = state => fromCart.getAddedIds(state)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.books, id)


// export const getTotal = state => {
//   if(getAddedIds(state.cart.addedIds) !== undefined){
//     return (
//       getAddedIds(state.cart.addedIds)
//         .reduce((total, id) =>
//           total + getProduct(state, id).price , 0 )
//   }
// }

//
export const getAddedCart = state => state.cart.selectedGoods

export const getCartProducts = state => state.cart.addedIds

// export const getCartProducts = state => {
//   if(getAddedIds(state.cart.addedIds) !== undefined){
//     return getAddedIds(state.cart.addedIds).map(id => ({...getProduct(state, id)}))
//   }
// }

// export const getCartProducts = state => {
//
//     return getAddedIds(state.cart.addedIds).map(id => ({...getProduct(state, id)}))
//
// }

export default rootReducer;
