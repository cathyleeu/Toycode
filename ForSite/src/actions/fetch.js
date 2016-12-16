import { FETCH_BOOKS, START_BOOKS_FETCH, COMPLETE_BOOKS_FETCH } from './types'
import axios from 'axios'


export var startBooksFetch = () => {
  return {
    type: START_BOOKS_FETCH
  };
};

export var completeBooksFetch = (books) => {
  return {
    type: COMPLETE_BOOKS_FETCH,
    books : books.data
  };
};

export const fetchBooks = () => (dispatch, getState) => {
  dispatch(startBooksFetch())
  const ROOT_URL = 'http://localhost:3090'
  axios.get(`${ROOT_URL}/books`).then((books) => {
     dispatch(completeBooksFetch(books))
   })
}
