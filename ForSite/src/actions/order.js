import * as types from './types'


export const addToCartUnsafe = (bookId) => ({
  type: types.ADD_TO_CART,
  bookId
})

export const addToOrder = (bookId, amount) => ({
  type: types.ADD_TO_ORDER,
  bookId,
  amount
})


// export const addToCartUnsafe = (bookId, amount) => ({
//   type: types.ADD_TO_CART,
//   bookId,
//   amount
// })

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
