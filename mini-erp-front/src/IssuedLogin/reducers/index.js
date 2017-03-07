import * as types from '../actions'


const initialState = {
  recordedInfo:{}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      return { recordedInfo: action.recordedInfo }
    case types.IS_REGISTER_NAMES:
      return { ...state, [action.names]: { students: action.students, has: true }}
    case types.IS_FETCHED_NAMES:
      return { ...state, [action.names]: { students: action.students, has: true }}
    default:
      return state
  }
}
