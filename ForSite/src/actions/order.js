import * as types from './types'


export const addToCartUnsafe = (bookId,bookTitle,bookPrice) => ({
  type: types.ADD_TO_CART,
  bookId,
  bookTitle,
  bookPrice
})

export const toggleSelect = (title, id, orderQutt, price) => ({
  type: types.SELECTED_TOGGLE_GOODS,
  title,
  id,
  orderQutt,
  price
})

export const requestQuantity = (bookId, amount) => ({
  type: types.REQUEST_QUANTITY,
  bookId,
  amount
})



export const requestInvoice = (bookId, amount) => ({
  type: types.CHECKOUT_REQUEST,
  bookId,
  amount
})




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
