import axios from 'axios'
import { browserHistory } from 'react-router'
import * as types from '../constants/types'


const ROOT_URL = 'http://localhost:3090'


export function signinUser(userData) {
  return function (dispatch) {
    // 서버에 이메일과 비밀번호 전송
    axios.post(`${ROOT_URL}/signin`, userData)
      .then(response => {
        // 요청이 좋다면?
          //유저상태 업데이트
          dispatch({ type: types.AUTH_USER })
          // JWT token 저장
          // console.log(userData)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('email', userData.email)
          dispatch(fetchUser())
          // feature페이지 re다이렉트
          browserHistory.push('feature')
      })
      .catch(() => {
        //요청이 구리다면?
         // 유저한테 에러 전송
         dispatch(authError('로그인을 다시해주세요.'))
      })
  }
}
export const toggleSignin = () => ({
  type: types.REGISTERED_STATUS,
  status: false
})

export const toggleSignup = () => ({
  type: types.REGISTER_STATUS,
  status: true
})


export function signupUser(userData) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, userData)
      .then(response => {
        // localStorage.setItem('token', response.data.token)
        alert('회원가입이 완료되었습니다. 로그인으로 넘어갑니다.')
        dispatch({ type: types.REGISTERED_STATUS, status: false })
        // browserHistory.push('signin')
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}


export function authError(error) {
  console.log(error)
  return {
    type: types.AUTH_ERROR,
    payload: error
  }
}

export function fetchUser() {
  const user = localStorage.getItem('email')
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/${user}`).then((user) => {
      // dispatch(fetchKinder(user))
      dispatch(completedFetchUser(user))
    })
  }
}
// function fetchKinder(user) {
//   return {
//     type: types.INITIAL_KINDER,
//     kinder: user.data[0].kinders
//   }
// }

export function completedFetchUser(user) {
  return {
    type: types.STATUS_ON_LOGIN,
    user: user.data[0]
  }
}

export function signoutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  return {
    type: types.UNAUTH_USER
  }
}
