import * as types from '../actions'


const initialState = {
  reports: {}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INFO_FOR_ISSUED:
      // console.log(action.recordedInfo);
      return {
        ...state,
        [action.recordedInfo.kinders[0].code]: action.recordedInfo.kinders[0]
      }
    case types.IS_REGISTER_NAMES:
    return { ...state, [action.classId]: { students: action.students, name:action.name} }
    case types.IS_FETCHED_NAMES:
      return { ...state, [action.classId]: { students: action.students, name:action.name }}
    case types.IS_EDITED_NAMES:
      return { ...state, [action.classId]: { students: action.students, name:action.name }}
    case types.IS_WRITING_NAMES:
      return { ...state, [action.classId] : { students: action.students }}
    case types.IS_REGISTERED_FIRST_TIME:
      return { ...state }
    // case types.NO_DATA_REPORTS : {
    //   ...state
    // }
    case types.IS_REQUESTED_REPORTS:
      return {
        ...state,
        reports: {
          ...state.reports,
          [action.userId] : {
            ...action.results
        }
      }
    }
    default:
      return state
  }
}
