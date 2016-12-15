import * as types from './types'
import shop from '../api/shop'


export const addToCartUnsafe = (bookId, amount) => ({
  type: types.ADD_TO_CART,
  bookId,
  amount
})
// Question: index 어떻게 뽑아낼 수 있을지.. ㅠ?
export const addToCart = (bookId, amount) => (dispatch, getState) => {
  if (getState().books[bookId-1].quantity > 0) {
    //지금 상태의 상품 id의 수량이 0개이상일 경우
    dispatch(addToCartUnsafe(bookId, amount))
    // addToCartUnsafe로 상품Id전달
  }
}


export const checkout = books => (dispatch, getState) => {
  const {cart} = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(books, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
  })
}
