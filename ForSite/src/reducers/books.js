import { COMPLETE_BOOKS_FETCH } from '../actions/types'


export default function(state = [], action) {
  switch (action.type) {
    case COMPLETE_BOOKS_FETCH:
     return [...state, ...action.books]
  }
  return state 
}
