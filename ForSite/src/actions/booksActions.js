import * as types from './types'
import courseApi from '../api/mockBooksApi'



export function loadBooksSuccess(books) {
  return {
    type: types.LOAD_BOOKS_SUCCESS,
    books
  }
}

export function loadBooks() {
  return function(dispatch) {
    return courseApi.getAllBooks().then(books => {
      dispatch(loadBooksSuccess(books))
    }).catch(error => {
      throw(error)
    })
  }
}
