import { FETCH_BOOKS } from '../components/order/types'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
    //type FETCH_BOOKS일때 state와 action.payload의 data가 전달된다.
     return [...state, ...action.payload.data]
     // ...action.payload.data => books array 들이 payload에 전달됨
  }
  return state // 빈 배열만 나열됨
}
