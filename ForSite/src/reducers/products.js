import { RECEIVE_PRODUCTS, ADD_TO_CART, FETCH_BOOKS, REQUEST_QUANTITY } from '../actions/types'

const products = (state, action) => {

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state
      }
    default:
      return state
  }
}




export const getProduct = (state, id) =>
  state[id-1]


const initialState = 0
export default function(state=initialState, action){
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, ...action}
    case REQUEST_QUANTITY:
      return {...state,
        amount : state.amount}
    default:
      return state
  }
}
