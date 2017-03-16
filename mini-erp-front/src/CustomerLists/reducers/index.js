import * as types from '../actions'


const initialState = {
  allUsers:[],
  allKCNames:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_USER_INFO:
      return { ...state, allUsers: action.response, Ufinished: true }
    case types.FETCH_ALL_KCLASS_NAMES:
      return {...state, allKCNames: action.response, KCfinished: true }
    default:
      return state
  }
}
