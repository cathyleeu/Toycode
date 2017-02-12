import * as types from './types'
import axios from 'axios'


export const startBooksFetch = () => {
  return {
    type: types.START_BOOKS_FETCH
  };
};

export const completeBooksFetch = (books) => {
  return {
    type: types.COMPLETE_BOOKS_FETCH,
    books : books.data
  };
};

export const fetchBooks = () => (dispatch, getState) => {
  dispatch(startBooksFetch())
  const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
  axios.get(`${ROOT_URL}/books`).then((books) => {
     dispatch(completeBooksFetch(books))
   })
}
