import * as types from '../actions'


const initialState = {
  allFFMT:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_FFMT:
      return { allFFMT: action.response }
    default:
      return state
  }
}
