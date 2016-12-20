import * as types from '../actions/types'

const initialState = {
  addedIds: [],
  amount: [],
  quantityById: {},
  selectedGoods: []
}
// Question: 왜 addedIds getAddedIds를 했을
//if (state.indexOf(action.bookId) !== -1 ){
//   return state
// }
const addedIds = ( state = initialState.addedIds, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      if(state.id != action.id) {
        return state
      }
      return [...state, {
        id: action.bookId,
        title: action.bookTitle,
        price: action.bookPrice
      }]
    default:
      return state
  }
}
// TODO: getAddedIds를 COMPLETE_BOOKS_FETCH가 된 후에 해야함

// export const getAddedIds = state => {
//   console.log('getAddedIds:',state);
//   return state
// }
// case types.SELECTED_TOGGLE_GOODS:
//   const {id, orderQutt, price } = action
//   return [...state,
//     {
//       id: id,
//       // selected: true,
//       orderQutt: orderQutt,
//       total : orderQutt * price
//     }
//   ]
export const selectedGoods = (state = initialState.selectedGoods, action) => {
  switch (action.type) {
    // case types.ADD_TO_CART:
    //   return {
    //     id:action.bookId,
    //     amount: undefined,
    //     total: undefined
    //   }
    // case types.UNSELECT_TOGGLE_GOODS:
    //   return [...state, {
    //     selected: false,
    //     amount: undefined,
    //     total: undefined
    //   }]
    case types.SELECTED_TOGGLE_GOODS:
      return [ ...state, {
          title: action.title,
          id: action.id,
          amount: action.orderQutt,
          price: action.price,
          total : (action.price*action.orderQutt)
        }
      ]
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
    // case REQUEST_QUANTITY:
    //   return state
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        // quantityById: quantityById(state.quantityById, action),
        selectedGoods: selectedGoods(state.selectedGoods, action)
      }
  }
}


export default cart
