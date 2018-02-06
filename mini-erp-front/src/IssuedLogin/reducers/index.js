import * as types from '../actions'


const initialState = {
  branchInfo:{},
  needNames: [],
  reports: {}
}

const filterNames = (state = initialState.needNames, newName) => {
  let names = state.indexOf(newName)
  if(names === -1){
    return [...state, newName ]
  } else {
    return state
  }
}

const needNames = (state = initialState.needNames, action ) => {
  switch (action.type) {
    case types.IS_REGISTERED_FIRST_TIME:
      return filterNames(state, action.classId)
    case types.IS_REGISTER_NAMES:
      return state.filter(classId => classId !== action.classId)
    default:
      return state
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      return { ...state, branchInfo: action.recordedInfo.branch, [action.recordedInfo.kinders[0].code]: action.recordedInfo.kinders[0] }
    case types.IS_REGISTER_NAMES:
    return { ...state, [action.classId]: { students: action.students, name:action.name}, needNames: needNames(state.needNames, action) }
    case types.IS_FETCHED_NAMES:
      return { ...state, [action.classId]: { students: action.students, name:action.name }}
    case types.IS_EDITED_NAMES:
      return { ...state, [action.classId]: { students: action.students, name:action.name}}
    case types.IS_WRITING_NAMES:
      return { ...state, [action.classId] : {students: action.students}}
    case types.IS_REGISTERED_FIRST_TIME:
      return { ...state, needNames: needNames(state.needNames, action)  }
    case types.IS_REQUESTED_REPORTS:
      return { ...state, reports: {
        ...state.reports,
        [action.userId] : {
          ...action.results
        }
      }}
    default:
      return state
  }
}
