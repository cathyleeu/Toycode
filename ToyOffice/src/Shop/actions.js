import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const START_BOOKS_FETCH = 'START_BOOKS_FETCH'
export const COMPLETE_BOOKS_FETCH = 'COMPLETE_BOOKS_FETCH'
export const ADD_TO_CART = 'ADD_TO_CART'



export const addToCartUnsafe = (book) => (dispatch) => {
  alert('장바구니에 담겼습니다.')
  dispatch({ type: ADD_TO_CART, book })
}


export const fetchBooks = () => (dispatch, getState) => {
  // dispatch(startBooksFetch())
  axios.get(`${ROOT_URL}/books`)
    .then((books) => {
     dispatch({type: COMPLETE_BOOKS_FETCH, books: books.data})
    })
}
