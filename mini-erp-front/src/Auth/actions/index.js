import axios from 'axios'
import { browserHistory } from 'react-router'
import * as types from '../constants/types'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const errMsg = (errM) => ({ type: types.LOGIN_ERROR, errM })



export function fetchMatchedBranch(branchCode) {
  return function (dispatch) {
    console.log("fetchMatchedBranch",branchCode)
    axios.get(`${ROOT_URL}/branch/${branchCode}`)
      .then((response) => {
        console.log("matchedB",response);
        dispatch({
          type: types.MATCHED_BRANCH,
          matchedB: response.data.kinders
        })
      })
      .catch(response => {
        console.log("없는 코드");
        dispatch(errMsg({matchedErr: "없는 코드입니다."}))
      })
  }
}

export const isValidEmail = (email) => (dispatch) => {
  axios.get(`${ROOT_URL}/email`)
   .then(res => dispatch({type: types.IS_EXISTING_USER_EMAIL, existingEmail: res.data}))
}
export const signupUser = (userData) => (dispatch) =>  {
  axios.post(`${ROOT_URL}/signup`, userData)
  .then(res => {
    alert('인증메일을 보냈습니다. 인증메일의 링크를 클릭하시면 회원가입이 완료됩니다.')
    dispatch({ type: types.REGISTERED_STATUS, status: false, error:'' })
    browserHistory.push('login')
  })
  .catch(res => {

    console.log("내가 에러다!!!",res.response.data);
    // res.response.data.map(errM => dispatch(errMsg(errM)))
    dispatch(errMsg(res.response.data))
    // alert('정확한 양식을 확인해주세요.')

  })
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
         dispatch(errMsg(res.response.data))
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
        dispatch(receiveUserInfo(response.data))
      })
  }
}

function receiveUserInfo(response) {
  console.log("receiveUserInfo", response);
  return {
    type: types.STATUS_ON_LOGIN,
    response,
    kinder: response.user.kinders,
    education: response.user.education,
    account: response.user.account,
    completed : true
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
