import * as types from './actions/types'

export default function booksReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_BOOKS_SUCCESS:
      return action.books

    default:
      return state

  }
}
