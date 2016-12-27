import * as types from './types'
import axios from 'axios'
import { browserHistory } from 'react-router'
const ROOT_URL = 'http://localhost:3090'

export const addToCartUnsafe = (bookId,bookTitle,bookPrice) => ({
  type: types.ADD_TO_CART,
  bookId,
  bookTitle,
  bookPrice
})

export const goodsSelect = (id, orderQutt) => ({
  type: types.SELECTED_GOODS,
  id,
  orderQutt
})

export const goodsDelete = (id) => ({
  type: types.DELETE_GOODS,
  id
})


export const requestInvoice = (invoiceData) => ((dispatch) => {
  axios.post(`${ROOT_URL}/invoices`, invoiceData)
    .then(response => {
      dispatch({ type: types.CHECKOUT_REQUEST })
      alert('주문이 완료되었습니다.')
      browserHistory.push('feature')
      // dispatch({ type: types.CHECKOUT_SUCCESS })
    })
    .catch((e) => {
      dispatch({ type: types.CHECKOUT_FAILURE })
      alert('주문을 실패하였습니다.')
    })
})
