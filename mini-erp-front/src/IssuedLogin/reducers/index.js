import * as types from '../actions'


const initialState = {
  recordedInfo:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      return { recordedInfo: action.recordedInfo }
    default:
      return state
  }
}
