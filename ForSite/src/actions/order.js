import * as types from './types'
import shop from '../api/shop'

// const const receiveProducts = books => ({
//   // type: types.RECEIVE_PRODUCTS,
//   console.log(books);
// })
//getAllproducts으로 상품 데이터를 받은 후,
//RECEIVE_PRODUCTS 타입은 products를 전달 하는 액션을 설정

export const getAllProducts = () => dispatch => {
  shop.getProducts( books => {
    console.log(dispatch(books));
    //화면을 시작하면 상품들을 불러오고 receiveProducts에 상품 data를 전달
  })
}

const addToCartUnsafe = bookId => ({
  type: types.ADD_TO_CART,
  bookId
})
// Question: index 어떻게 뽑아낼 수 있을지.. ㅠ?
export const addToCart = bookId => (dispatch, getState) => {
  if (getState().books[bookId-1].quantity > 0) {
    //지금 상태의 상품 id의 수량이 0개이상일 경우
    dispatch(addToCartUnsafe(bookId))
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
