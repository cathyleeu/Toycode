import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REQUEST_QUANTITY,
  ADD_TO_ORDER
} from '../actions/types'

const initialState = {
  addedIds: [],
  amount: [],
  quantityById: []
}
// Question: 왜 addedIds getAddedIds를 했을

const addedIds = ( state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.bookId) !== -1 ){
        return state
      }
      return [...state, action.bookId]
    case CHECKOUT_REQUEST:
      return [ ...action.bookId]
    default:
      return state
  }
}
// TODO: getAddedIds를 COMPLETE_BOOKS_FETCH가 된 후에 해야함

export const getAddedIds = state => {
  console.log('getAddedIds:',state);
  return state
}

const quantityById = ( state = initialState.quantityById, action) => {
  switch (action.type) {
    case REQUEST_QUANTITY:
      const { bookId, amount } = action
      return {
        ...state,
        [bookId]: amount
      }
    default:
      return state
  }
}

// [bookId]: (state[bookId] || 0) + 1

export const getQuantity = (state, bookId) =>
  state.quantityById[bookId] || 0
  // 주문하는 갯수가 0개 또는 선택한 추가량




const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action)
        // quantityById: quantityById(state.quantityById, action)
      }
  }
}


export default cart
