import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'




export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'


export const tempoLogin = (userData) => (dispatch) => {
  axios.post(`${ROOT_URL}/signin`, userData)
    .then(response => {
      // 요청이 좋다면?
        // JWT token 저장
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', userData.email)
        //유저상태 업데이트
        dispatch({type: AUTH_USER})
        // feature페이지 re다이렉트
        // browserHistory.push('feature')
    })
    .catch(err => {
      dispatch({type: UNAUTH_USER, err: err.response.data.msg})
    })
}

export const tempoLogOut = (history) => (dispatch) => {
  if(confirm('로그아웃 하시겠습니까?')){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    dispatch({type: UNAUTH_USER})
    history.replace('/')
  }
}



export const tempoUserState = () => (dispatch) => {
  let token = localStorage.getItem('token')
  if(token){
    dispatch({type: AUTH_USER})
  } else {
    dispatch({type: UNAUTH_USER})
  }
}


// export const signinUser = (userData) => (dispatch) => {
//   // 서버에 이메일과 비밀번호 전송
//   axios.post(`${ROOT_URL}/signin`, userData)
//     .then(response => {
//       // 요청이 좋다면?
//         // JWT token 저장
//         localStorage.setItem('token', response.data.token)
//         localStorage.setItem('email', userData.email)
//         //유저상태 업데이트
//         dispatch({type: AUTH_USER})
//         // feature페이지 re다이렉트
//         // browserHistory.push('feature')
//     })
//     .catch((res) => dispatch({type: UNAUTH_USER}))
// }
