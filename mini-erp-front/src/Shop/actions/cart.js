import * as types from '../constants/types'
import axios from 'axios'
import { browserHistory } from 'react-router'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

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
      browserHistory.push('account')
      dispatch({ type: types.CHECKOUT_SUCCESS })
    })
    .catch((e) => {
      dispatch({ type: types.CHECKOUT_FAILURE })
      alert('주문을 실패하였습니다.')
    })
})

export const getInvoices = () => (dispatch, getState) => {
  dispatch({type: types.START_INVOICES_FETCH})
  const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
  const user = localStorage.getItem('email')
  axios.get(`${ROOT_URL}/invoices/${user}`).then((invoices) => {
     dispatch({
       type: types.COMPLETE_INVOICES_FETCH,
       invoices : invoices.data
     })
   })
}
