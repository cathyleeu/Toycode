import * as types from './actions'

const initialState =  {
  detail: []
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_INVOICES_FETCH:
      return { ...state, detail: action.detail}
    default:
      return state
  }
}
