import * as types from './actions'

const initialState =  {
  books: [],
  selectedGoods: [],
  deliveryInfo: {}
}

export const selectedGoods = (state, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        ...action.book
      }]
    // case types.EMPTY_CART:
    //   return state;
    case types.ENTER_GOODS_QUTT:
      return state.map(goods => {
        if(goods.code === action.code){
          return { ...goods, amount: action.qutt }
        } else {
          return goods
        }
      })
    case types.DELETE_GOODS:
      return state.filter((goods) => goods.code !== action.code);
    default:
      return state
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_BOOKS_FETCH:
      return { ...state, books: action.books}
    case types.ENTER_DELIVERY_INFO:
      return { ...state, deliveryInfo: action.deliveryInfo}
    case types.COMPLETE_ADDRESS_FETCH:
      return { ...state, juso: action.juso }
    case types.COMPLETE_GOODS_ORDER:
      return { ...state, deliveryInfo: {}, selectedGoods: [] }
    default:
      return {
        ...state,
        selectedGoods: selectedGoods(state.selectedGoods, action)
      }
  }
}
