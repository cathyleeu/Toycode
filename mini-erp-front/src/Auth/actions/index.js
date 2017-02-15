import axios from 'axios'
import { browserHistory } from 'react-router'
import * as types from '../constants/types'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const emailErr = (emailErr) => ({ type: types.EMAIL_ERROR, emailErr })
export const passwordErr = (passwordErr) => ({ type: types.PASSWORD_ERROR, passwordErr })
export const bizErr = (bizErr) => ({ type: types.BIZ_ERROR, bizErr })
export const addrErr = (addrErr) => ({ type: types.ADDR_ERROR, addrErr })
export const codeErr = (codeErr) => ({ type: types.CODE_ERROR, codeErr })
export const loginErr = (loginErr) => ({ type: types.LOGIN_ERROR, loginErr })


export function signupUser(userData) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, userData)
      .then(res => {
        alert('인증메일을 보냈습니다. 인증메일의 링크를 클릭하시면 회원가입이 완료됩니다.')
        dispatch({ type: types.REGISTERED_STATUS, status: false, error:'' })
      })
      .catch(res => {
        console.log("내가 에러다!!!",res.response.data);
        dispatch(emailErr(res.response.data.emailErr))
        dispatch(passwordErr(res.response.data.passwordErr))
        dispatch(codeErr(res.response.data.codeErr))
        dispatch(addrErr(res.response.data.addrErr))
        dispatch(bizErr(res.response.data.bizErr))
      })
  }
}


export function signinUser(userData) {
  return function (dispatch) {
    // 서버에 이메일과 비밀번호 전송
    axios.post(`${ROOT_URL}/signin`, userData)
      .then(response => {
        // 요청이 좋다면?
          // JWT token 저장
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('email', userData.email)
          //유저상태 업데이트
          dispatch(fetchUserInfo())
          // feature페이지 re다이렉트
          browserHistory.push('feature')
      })
      .catch((res) => {
         dispatch(loginErr(res.response.data.loginErr))
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


export function fetchUserInfo() {
  return function (dispatch) {
    // dispatch({ type: types.AUTH_USER })
    const user = localStorage.getItem('email')
    return axios.get(`${ROOT_URL}/user/${user}`)
      .then((response) => {
        dispatch(receiveUserInfo(response.data[0]))
      })
  }
}

function receiveUserInfo(response) {
  return {
    type: types.STATUS_ON_LOGIN,
    response,
    kinder: response.kinders,
    education: response.education,
    account: response.account
  }
}



export function signoutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  return function (dispatch) {
    browserHistory.push('logout')
    dispatch({type: types.UNAUTH_USER});
  }
}
