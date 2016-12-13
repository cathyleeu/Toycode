import { FETCH_BOOKS, PUSH_TO_CART } from '../components/order/types'
// import { FETCH_BOOKS } from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
    //type FETCH_BOOKS일때 state와 action.payload의 data가 전달된다.
     return [...state, ...action.payload.data]
     // ...action.payload.data => books array 들이 payload에 전달됨
    case PUSH_TO_CART:
     return [ ...state, Object.assign({}, action.addedbooks)]
     //작동 잘 한다면 새로운 state를 return
  }
  return state // 빈 배열만 나열됨
}


// export default function addedBooksToCart(state = [], action) {
//   switch (action.type) {
//     case PUSH_TO_CART:
//       return [...state, Object.assign({}, action.addedbooks)]
//       //작동 잘 한다면 새로운 state를 return
//     default:
//       return state;
//       //아니라면 원래 state를 return
//
//   }
// }


/*
function redecer(state, action){
  Return new state based on action passed
  (state, action) =>  new state (믹서기와 같은 것)
}


*/
