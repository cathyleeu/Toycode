import * as types from './types'
import axios from 'axios'
import { browserHistory } from 'react-router'
const ROOT_URL = process.env.SERVER_URL || 'http://localhost:3090'

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
      browserHistory.push('my_account')
      //TODO: 추가된 invoice만 가져오도록 해야함....ㅎㅎㅎㅎ
      dispatch(getInvoices())
      //TODO: CHECKOUT_SUCCESS되면 빈창으로 만드는 것
      dispatch({ type: types.CHECKOUT_SUCCESS })
    })
    .catch((e) => {
      dispatch({ type: types.CHECKOUT_FAILURE })
      alert('주문을 실패하였습니다.')
    })
})

export const getInvoices = () => (dispatch, getState) => {
  dispatch(startInvoicesFetch())
  const ROOT_URL = process.env.SERVER_URL || 'http://localhost:3090'
  const user = localStorage.getItem('email')
  axios.get(`${ROOT_URL}/invoices/${user}`).then((invoices) => {
     dispatch(completeInvoicesFetch(invoices))
   })
}

export const startInvoicesFetch = () => {
  return {
    type: types.START_INVOICES_FETCH
  };
};

export const completeInvoicesFetch = (invoices) => {
  return {
    type: types.COMPLETE_INVOICES_FETCH,
    invoices : invoices.data
  };
};
