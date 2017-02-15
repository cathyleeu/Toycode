import * as types from '../constants/types'


//이곳에 if문을 해서 auth의 초기값을 설정 할 수 있도록 하는 것은.. 안되낭? ㅠㅠㅠ

const token = localStorage.getItem('token')
const initialState = function(){
  if(token) {
    return {
      authenticated:true,
      status: false,
      // authenticated: false,
      error: '',
      email:'',
      user:{}
    }
  } else {
    return {
      status: false,
      authenticated: false,
      error: {},
      email:'',
      user:{}
    }
  }
}


export default function (state = initialState(), action) {
  switch (action.type) {
    case types.REGISTERED_STATUS:
    case types.REGISTER_STATUS:
      return { ...state, status: action.status, error: action.error }
    case types.AUTH_USER:
      return { ...state, authenticated: true}
    case types.STATUS_ON_LOGIN:
      return { ...state, user: action.response, email: localStorage.getItem('email'), authenticated: true }
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, email: '', user: '', status: false }
    case types.EMAIL_ERROR:
      return { ...state, error: {...state.error, emailErr: action.emailErr } }
    case types.PASSWORD_ERROR:
      return { ...state, error: {...state.error, passwordErr: action.passwordErr} }
    case types.ADDR_ERROR:
      return { ...state, error: {...state.error, addrErr: action.addrErr} }
    case types.BIZ_ERROR:
      return { ...state, error: {...state.error, bizErr: action.bizErr} }
    case types.CODE_ERROR:
      return { ...state, error: {...state.error, codeErr: action.codeErr} }
    case types.LOGIN_ERROR:
      return { ...state, error: {...state.error, loginErr: action.loginErr} }
    default:
      return state
  }
}
