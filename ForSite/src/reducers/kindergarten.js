import * as types from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case types.ADD_KINDERGARTEN:
      return {...state, updated: true}
    default:
      return state

  }
}
