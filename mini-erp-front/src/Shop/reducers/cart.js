import * as types from '../constants/types'

const initialState = {
  addedIds: [],
  selectedGoods: []
}


const addedIds = ( state = initialState.addedIds, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        id:action.book.code,
        erp: action.book.erpCode,
        title: action.book.title,
        level: action.book.level,
        volume: action.book.volume,
        price: action.bookPrice
      }]
    case types.DELETE_GOODS:
      return state.filter((goods) => goods.id !== action.id);
    default:
      return state
  }
}

export const selectedGoods = (state = initialState.selectedGoods, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        id:action.book.code,
        erp: action.book.erpCode,
        title: action.book.title,
        level: action.book.level,
        volume: action.book.volume,
        amount: '',
        price: action.bookPrice
      }]
    case types.EMPTY_CART:
      return state;
    case types.SELECTED_GOODS:
      return state.map((goods) => {
        if(goods.id === action.id){
          return { ...goods, amount: action.orderQutt }
        } else { return goods }})
    case types.DELETE_GOODS:
      return state.filter((goods) => goods.id !== action.id);
    default:
      return state
  }
}


const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_REQUEST:
      return state
    case types.CHECKOUT_SUCCESS:
      return state={}
    case types.CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        selectedGoods: selectedGoods(state.selectedGoods, action)
      }
  }
}

export const getAddedCart = state => state.cart.selectedGoods
export const getCartProducts = state => state.cart.addedIds


export default cart
