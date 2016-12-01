import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from '../actions/types'


/*
signin.js에서
function mapStateToProps(state){
  auth: state.auth,
  errorMessage: state.auth.error
  props로 사용할 이름(임의대로 지을 수 있음): state.reducer에서 연결하는 이름(리듀서에 있는 name과 일치해야함!)
}
와 연결 되는 것이다~~~
*/

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
