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


const getAddedIds = state => fromCart.getAddedIds(state)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id), 0 ).toFixed(2)
      //주문하는 수량만큼 총 가격 계산하고 소숫점 2번째 까지


export const getCartProducts = state =>
  getAddedIds(state.cart.addedIds)
  // .map(id => ({
  //   ...getProduct(state, id),
  //   // cart reducer getProduct 상태를 그대로 전달
  //   // quantity: getQuantity(state, id)
  // }))
  // console.log('여기는 index.js:',state.cart);

export default rootReducer;
