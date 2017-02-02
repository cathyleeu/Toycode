import * as CSTIV from '../constants'


const initialState = {
  allIVes:[]
}


export default function (state = initialState, action) {
  switch (action.type) {
    case CSTIV.FETCH_ALL_USER_IVES:
      return { allIVes: action.response }
    default:
      return state
  }
}
