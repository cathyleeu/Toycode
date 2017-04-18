import * as types from './actions'

const initialState =  {
  books: []
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_BOOKS_FETCH:
      return { ...state, books: action.books}
    default:
      return state
  }
}
