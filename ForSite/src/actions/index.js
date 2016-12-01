import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types'


const ROOT_URL = 'http://localhost:3090'

export function signinUser(userData) {
  return function (dispatch) {
    // 서버에 이메일과 비밀번호 전송
    axios.post(ROOT_URL+'/signin', userData)
      .then(response => {
        // 요청이 좋다면?
          //유저상태 업데이트
          dispatch({ type: AUTH_USER })
          // JWT token 저장
          localStorage.setItem('token', response.data.token)
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

export function signupUser(userData) {
  return function (dispatch) {
    axios.post(ROOT_URL+'/signup', userData)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        browserHistory.push('signin')
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}


export function authError(error) {
  console.log(error)
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}
