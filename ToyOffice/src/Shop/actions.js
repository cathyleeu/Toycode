import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const START_BOOKS_FETCH = 'START_BOOKS_FETCH'
export const COMPLETE_BOOKS_FETCH = 'COMPLETE_BOOKS_FETCH'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ENTER_GOODS_QUTT = 'ENTER_GOODS_QUTT'
export const DELETE_GOODS = 'DELETE_GOODS'



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

export const goodsDelete = (code) => ({ type: DELETE_GOODS, code })
