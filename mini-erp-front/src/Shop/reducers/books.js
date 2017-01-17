import * as types from '../constants/types'


export default function(state = [], action) {
  switch (action.type) {
    case types.COMPLETE_BOOKS_FETCH:
     return [...state, ...action.books]
  }
  return state
}
