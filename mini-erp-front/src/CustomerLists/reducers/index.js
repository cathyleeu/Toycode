import * as CSTLIST from '../constants'


const initialState = {
  allUsers:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case CSTLIST.FETCH_ALL_USER_INFO:
      return { allUsers: action.response }
    default:
      return state
  }
}
