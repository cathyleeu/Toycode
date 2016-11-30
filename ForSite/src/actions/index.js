import axios from 'axios'
import { browserHistory } from 'react-router'


const ROOT_URL = 'http://localhost:3090'

export function signinUser(userData) {
  return function (dispatch) {
    // 서버에 이메일과 비밀번호 전송
    axios.post(ROOT_URL+'/signin', userData)
      .then(response => {
        // 요청이 좋다면?
          //유저상태 업데이트
          // dispatch({ type: AUTH_USER })
          // JWT token 저장
          // feature페이지 re다이렉트
        browserHistory.push('feature')
      })
      .catch(() => {
        //요청이 구리다면?
         // 유저한테 에러 전송
      })
  }
}

export function signupUser(userData) {
  return function (dispatch) {
    // 서버에 이메일과 비밀번호 전송
    axios.post(ROOT_URL+'/signup', userData)
      .then(response => {
        // 요청이 좋다면?
          //유저상태 업데이트
          // dispatch({ type: AUTH_USER })
          // JWT token 저장
          // feature페이지 re다이렉트
        browserHistory.push('signin')
      })
      .catch(() => {
        //요청이 구리다면?
         // 유저한테 에러 전송
      })
  }
}
