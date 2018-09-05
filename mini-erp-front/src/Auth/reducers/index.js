import * as types from '../constants/types'


//이곳에 if문을 해서 auth의 초기값을 설정 할 수 있도록 하는 것은.. 안되낭? ㅠㅠㅠ

const token = localStorage.getItem('token')
const initialState = function(){
  if(token) {
    return {
      authenticated:true,
      status: false,
      error: '',
      email:'',
      user:{}
    }
  } else {
    return {
      status: false,
      authenticated: false,
      errMsg: [],
      email:'',
      user:{}
    }
  }
}


export default function (state = initialState(), action) {
  switch (action.type) {
    case types.REGISTERED_STATUS:
    case types.REGISTER_STATUS:
      return { ...state, status: action.status, errMsg: {} }
    case types.IS_EXISTING_USER_EMAIL:
      return { ...state, existingEmail: action.existingEmail}
    case types.AUTH_USER:
      return { ...state, authenticated: true}
    case types.MATCHED_BRANCH:
      return { ...state, matchedB: action.matchedB }
    case types.STATUS_ON_LOGIN:
      return { ...state,
               user: action.response.user,
               loginInfo: action.response.loginInfo,
               email: localStorage.getItem('email'),
               authenticated: true, 
               completed : action.completed
             }
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, email: '', user: '', status: false }
    case types.LOGIN_ERROR:
      return { ...state, errMsg: action.errM.type === "loginErr" ? [{type:action.errM.type, msg:action.errM.msg }] : action.errM}
    default:
      return state
  }
}
