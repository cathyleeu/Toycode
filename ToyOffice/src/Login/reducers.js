import * as types from './actions'

const initialState =  {
  status: false,
  authenticated: false,
  err: '',
  email:'',
  user:{}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, authenticated: true}
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, err: action.err}
    default:
      return state
  }
}
