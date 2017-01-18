import * as types from '../constants/types'

const initialState = {
  status: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REGISTERED_STATUS:
    case types.REGISTER_STATUS:
      return { ...state, status: action.status }
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
