import * as types from './actions'

const initialState =  {
  status: false,
  authenticated: false,
  err: {},
  email:'',
  user:{},
  complete: false
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.ACCURATE_EMAIL:
    case types.UNAVAILABLE_EMAIL:
      return { ...state, emailValid: false, err: { ...state.err, emailErr: action.err } }
    case types.AVAILABLE_EMAIL:
      return { ...state, emailValid: true, err: { ...state.err, emailErr: action.err } }
    case types.ERR_EMAIL:
    case types.ERR_PASSWORD:
    case types.ERR_PASSWORD_CONFIRM:
    case types.ERR_PASSWORD_MISMATCH:
    case types.ERR_ROAD_ADDR:
    case types.ERR_DETAIL_ADDR:
      return { ...state, err: { ...state.err, [action.name]: action.err } }
    case types.ACCURATE_PASSWORD:
    case types.ERR_EMPTY:
      return { ...state, err: { ...state.err, [`${action.name}Err`]: action.err } }
    case types.REGISTERED_STATUS:
      return { ...state, err: {}, complete: true }
    case types.AUTH_USER:
      return { ...state, authenticated: true, user: action.user }
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, err: { ...state.err, loginErr: action.err }}
    // case types.GET_USER_INFO:
    //   return { ...state, user: action.user }
    case types.COMPLETE_ADDRESS_FETCH:
      return { ...state, juso: action.juso }
    default:
      return state
  }
}
