import * as types from './actions'

const initialState =  {
  books: [],
  selectedGoods: []
}

export const selectedGoods = (state, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        ...action.book
      }]
    // case types.EMPTY_CART:
    //   return state;
    // case types.SELECTED_GOODS:
    //   return state.map((goods) => {
    //     if(goods.id === action.id){
    //       return { ...goods, amount: action.orderQutt }
    //     } else { return goods }})
    // case types.DELETE_GOODS:
    //   return state.filter((goods) => goods.id !== action.id);
    default:
      return state
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_BOOKS_FETCH:
      return { ...state, books: action.books}

    default:
      return {
        ...state,
        selectedGoods: selectedGoods(state.selectedGoods, action)
      }
  }
}
