import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'




export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const GET_USER_INFO = 'GET_USER_INFO'

export const SEARCH_ADDRESS = 'SEARCH_ADDRESS'
export const COMPLETE_ADDRESS_FETCH = 'COMPLETE_ADDRESS_FETCH'


// 주소 api
const currentPage = 1;
const countPerPage = 200;
const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0';
const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';


export const searchAddress = (location) => (dispatch) => {
  axios.get(`${searchUrl}?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(location)}&confmKey=${confmKey}&resultType=json`)
  .then((address) => {
    let length = address.data.results.juso.length;
    
    if( length > 10) {
      alert("주소를 자세히 입력하세요.")
    } else {
      dispatch({type:SEARCH_ADDRESS})
      dispatch({
        type: COMPLETE_ADDRESS_FETCH,
        juso: address.data.results.juso
      })
    }
  })
}


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
//
// export async function asyncVerifiedCode(userType, code) {
//   // let message, result, customerType;
//   code = code.trim().toLocaleLowerCase()
//
//   const a = await axios.post(`${ROOT_URL}/verification/${code}`, { userType } )
//
//   debugger
// }
//
// export const fetchOffersSuccess = (res) => {
//   console.log(res);
// }
//
// export const verifiedCode = (userType, code) => (dispatch) => {
//   // console.log(userType, code);
//   let message, result, customerType;
//
//   code = code.trim().toLocaleLowerCase()
//   let resultMessage = axios.post(`${ROOT_URL}/verification/${code}`, { userType } )
//
//   return resultMessage.then(
//     response => dispatch(fetchOffersSuccess(response))
//   )
// }



export const getUserInfo = (email) => (dispatch) => {
  axios.get(`${ROOT_URL}/user/${email}`)
  .then( res => {
    console.log(res.data)
    dispatch({
      type: GET_USER_INFO,
      user: res.data,
      kinders: res.data.kinders
    })
  })
}

export const tempoUserState = () => (dispatch) => {
  let token = localStorage.getItem('token'), email = localStorage.getItem('email');
  if(token){
    dispatch({type: AUTH_USER})
    dispatch(getUserInfo(email))
  } else {
    dispatch({type: UNAUTH_USER})
  }
}

export const tempoLogOut = (history) => (dispatch) => {
  if(confirm('로그아웃 하시겠습니까?')){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    dispatch({type: UNAUTH_USER})
    history.replace('/')
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
