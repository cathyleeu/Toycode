import * as types from '../actions/types'

const initialState = {
  addedIds: [],
  amount: [],
  quantityById: {},
  selectedGoods: []
}

// TODO: 선택된 id가 기존에 있는 id 와 동일할 경우 state를 렌더링해야함

//if (state.indexOf(action.bookId) !== -1 ){
//   return state
// }
const addedIds = ( state = initialState.addedIds, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        id:action.bookId,
        title: action.bookTitle,
        price: action.bookPrice
      }]
    case types.DELETE_GOODS:
      return state.filter((goods) => goods.id !== action.id);
    default:
      return state
  }
}

// export const getAddedIds = state => {
//   console.log('getAddedIds:',state);
//   return state
// }


export const selectedGoods = (state = initialState.selectedGoods, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, {
        id:action.bookId,
        title: action.bookTitle,
        amount: '',
        price: action.bookPrice
      }]
    case types.SELECTED_GOODS:
      return state.map((goods) => {
        if(goods.id == action.id){
          return { ...goods, amount: action.orderQutt}
        } else { return goods }})
    case types.DELETE_GOODS:
      return state.filter((goods) => goods.id !== action.id);
    default:
      return state
  }
}

// const quantityById = ( state = initialState.quantityById, action) => {
//   switch (action.type) {
//     // case ADD_TO_CART:
//     //   return [...state, {
//     //     bookId: action.bookId,
//     //     amount: action.amount
//     //     }
//     //   ]
//     case types.CHECKOUT_REQUEST:
//       const { bookId, amount } = action
//       return [
//         ...state,
//       { bookId, amount }
//     ]
//     case types.REQUEST_QUANTITY:
//       return { ...state, amount}
//     default:
//       return state
//   }
// }


//
// export const getQuantity = (state, bookId) => {
//   console.log('state:',state);
//   return state.quantityById[bookId] || 0
// }

  // 주문하는 갯수가 0개 또는 선택한 추가량




const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_REQUEST:
      return state.selectedGoods
    case types.CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        // quantityById: quantityById(state.quantityById, action),
        selectedGoods: selectedGoods(state.selectedGoods, action)
      }
  }
}


export default cart
