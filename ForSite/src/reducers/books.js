import { COMPLETE_BOOKS_FETCH } from '../actions/types'


export default function(state = [], action) {
  switch (action.type) {
    case COMPLETE_BOOKS_FETCH:
    //type FETCH_BOOKS일때 state와 action.payload의 data가 전달된다.
     return [...state, ...action.books]
     // ...action.payload.data => books array 들이 payload에 전달됨
  }
  return state // 빈 배열만 나열됨
}
