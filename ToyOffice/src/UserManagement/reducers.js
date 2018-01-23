import * as types from './actions'

const initialState =  {
  management: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_ACADEMY:
      return {
        ...state
      }
    default:
      return state
  }
}
