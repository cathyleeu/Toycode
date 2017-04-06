import * as types from '../actions'


const initialState = {
  allRQT:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_RQT:
      return { allRQT: action.response }
    default:
      return state
  }
}
