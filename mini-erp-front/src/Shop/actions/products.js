import * as types from '../constants/types'
import axios from 'axios'



//   const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

// export const startBooksFetch = () => ({
//   type: types.START_BOOKS_FETCH
// });
//
// export const completeBooksFetch = (books) => ({
//   type: types.COMPLETE_BOOKS_FETCH,
//   books : books.data
// });
//
//
// export const fetchBooks = () => (dispatch, getState) => {
//   dispatch(startBooksFetch())

//   axios.get(`${ROOT_URL}/books`).then((books) => {
//      dispatch(completeBooksFetch(books))
//    })
// }
