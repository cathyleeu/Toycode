import * as types from '../constants/types'


export default function (state = {}, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, error: '', authenticated: true, email: localStorage.getItem('email')}
    case types.STATUS_ON_LOGIN:
      return { ...state, user: action.user}
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, email: '', user: '' }
    case types.AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
