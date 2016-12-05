import { FETCH_BOOKS } from '../components/order/types'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
    console.log(action.payload.data);
     return [...state, ...action.payload.data]
  }
  return state
}
