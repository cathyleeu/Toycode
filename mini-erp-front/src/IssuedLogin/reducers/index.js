import * as types from '../actions'


const initialState = {
  branchInfo:{},
  needNames: []
}

const needNames = (state = initialState.needNames, action ) => {
  switch (action.type) {
    case types.IS_REGISTERED_FIRST_TIME:
      return [...state, action.kclassName ]
    case types.IS_REGISTER_NAMES:
      return state.filter(className => className !== action.className)
    default:
      return state
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      return { ...state, branchInfo: action.recordedInfo.branch, [action.recordedInfo.kinders[0].code]: action.recordedInfo.kinders[0] }
    case types.IS_REGISTER_NAMES:
    return { ...state, [action.names]: { students: action.students}, needNames: needNames(state.needNames, action) }
    case types.IS_FETCHED_NAMES:
      return { ...state, [action.names]: { students: action.students }}
    case types.IS_EDITED_NAMES:
      return { ...state, [action.names]: { students: action.students}}
    case types.IS_WRITING_NAMES:
      return { ...state, [action.kclassName] : {students: action.students}}
    case types.IS_REGISTERED_FIRST_TIME:
      return { ...state, needNames: needNames(state.needNames, action)  }
    default:
      return state
  }
}
