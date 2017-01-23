import * as types from '../actions/types'

const initialState = {
  juso:[]
}

export default function(state = initialState, action) {
  switch (action.type) {
   case types.COMPLETE_ADDRESS_FETCH:
     return { ...state, juso:action.juso}
  }
  return state
}
