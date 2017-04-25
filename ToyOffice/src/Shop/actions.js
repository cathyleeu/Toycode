import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const START_BOOKS_FETCH = 'START_BOOKS_FETCH'
export const COMPLETE_BOOKS_FETCH = 'COMPLETE_BOOKS_FETCH'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ENTER_GOODS_QUTT = 'ENTER_GOODS_QUTT'
export const ENTER_DELIVERY_INFO = 'ENTER_DELIVERY_INFO'
export const DELETE_GOODS = 'DELETE_GOODS'
export const SEARCH_ADDRESS = 'SEARCH_ADDRESS'
export const COMPLETE_ADDRESS_FETCH = 'COMPLETE_ADDRESS_FETCH'

const currentPage = 1;
const countPerPage = 200;
const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0';
const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';

export const searchAddress = (location) => (dispatch) => {
  axios.get(`${searchUrl}?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(location)}&confmKey=${confmKey}&resultType=json`)
  .then((address) => {
    dispatch({type:SEARCH_ADDRESS})
    dispatch({
      type: COMPLETE_ADDRESS_FETCH,
      juso: address.data.results.juso
    })
  })
}


export const fetchBooks = () => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/books`)
  .then((books) => dispatch({type: COMPLETE_BOOKS_FETCH, books: books.data}))
}

export const addToCartUnsafe = (book) => (dispatch) => {
  alert('장바구니에 담겼습니다.')
  dispatch({ type: ADD_TO_CART, book })
}

export const enterGoodsQutt = (code, qutt) => (dispatch) => {
  dispatch({ type: ENTER_GOODS_QUTT, code, qutt })
}
export const enterDeliveryDetail = (deliveryInfo) => (dispatch) => {
  dispatch({ type: ENTER_DELIVERY_INFO, deliveryInfo})
}

export const goodsDelete = (code) => ({ type: DELETE_GOODS, code })
