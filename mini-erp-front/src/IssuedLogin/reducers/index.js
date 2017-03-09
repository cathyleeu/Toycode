import * as types from '../actions'


const initialState = {
  branchInfo:{}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      return { ...state, branchInfo: action.recordedInfo.branch, [action.recordedInfo.kinders[0].code]: action.recordedInfo.kinders[0] }
    case types.IS_REGISTER_NAMES:
    return { ...state, [action.names]: { students: action.students}}
    case types.IS_FETCHED_NAMES:
      return { ...state, [action.names]: { students: action.students }}
    case types.IS_EDITED_NAMES:
    case types.IS_WRITING_NAMES:
      return { ...state, [action.kclassName] : {students: action.students, ...state[action.kclassName]}}
    default:
      return state
  }
}
