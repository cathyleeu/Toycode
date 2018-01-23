import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'




export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const GET_USER_INFO = 'GET_USER_INFO'

export const REGISTERED_STATUS = 'REGISTERED_STATUS'

export const SEARCH_ADDRESS = 'SEARCH_ADDRESS'
export const COMPLETE_ADDRESS_FETCH = 'COMPLETE_ADDRESS_FETCH'

export const ACCURATE_EMAIL = 'ACCURATE_EMAIL'
export const ACCURATE_PASSWORD = 'ACCURATE_PASSWORD'

export const AVAILABLE_EMAIL = 'AVAILABLE_EMAIL'
export const UNAVAILABLE_EMAIL = 'UNAVAILABLE_EMAIL'

export const ERR_NAME = 'ERR_NAME'
export const ERR_EMAIL = 'ERR_EMAIL'
export const ERR_PASSWORD = 'ERR_PASSWORD'
export const ERR_PASSWORD_CONFIRM = 'ERR_PASSWORD_CONFIRM'
export const ERR_PASSWORD_MISMATCH = 'ERR_PASSWORD_MISMATCH'
export const ERR_ROAD_ADDR = 'ERR_ROAD_ADDR'
export const ERR_DETAIL_ADDR = 'ERR_DETAIL_ADDR'

export const ERR_EMPTY = 'ERR_EMPTY'

export const INITIAL_COMPLETE = 'INITIAL_COMPLETE'

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


export const getUserInfo = () => (dispatch) => {
  let email = localStorage.getItem('email');
  axios.get(`${ROOT_URL}/user/${email}`)
      .then( res => {
        dispatch({
          type: GET_USER_INFO,
          user: res.data,
          kinders: res.data.kinders
        })
      })
  if(email) {
    return true
  }
}

export const tempoUserState = () => (dispatch) => {
  let token = localStorage.getItem('token');
  if(token){

    dispatch({ type: AUTH_USER })
    dispatch(getUserInfo())

  } else {
    dispatch({type: UNAUTH_USER})
  }
}

export const postLogin = (userData) => (dispatch) => {
  axios.post(`${ROOT_URL}/signin`, userData)
    .then(response => {
      // 요청이 좋다면?
        // JWT token 저장
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', userData.email)
        //유저상태 업데이트
        dispatch(tempoUserState())
        // feature페이지 re다이렉트
        // browserHistory.push('feature')
    })
    .catch(err => {
      console.log(err);
      // console.log(err.response.data.msg);
      alert(err.response.data.msg)
      dispatch({type: UNAUTH_USER, err: err.response.data.msg})
    })
}

export const validatedValue = (value, name) => (dispatch) => {
  //TODO: email err에 관련된 것

  let validation = {
    email : {
      exp : /^[\w.+]+@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      type: ACCURATE_EMAIL,
      err: "정확한 이메일을 입력하세요."
    },
    password : {
      exp : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      type: ACCURATE_PASSWORD,
      err: "최소 8 자, 문자와 숫자 입력하세요"
    }
  }
  // let emailExp = /^[\w.+]+@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let { exp, type, err } = validation[name]
  if(!exp.test(value)) {
    dispatch({ type, err, name })
    // alert("정확한 이메일을 입력하세요.")
    return false
  }
  if(name === "email") {
    axios.get(`${ROOT_URL}/renewalSignup/${value}`)
        .then(res => {
          dispatch({ type: AVAILABLE_EMAIL, err: "" })
          alert("사용 가능한 이메일 입니다.")
          console.log(res.data.msg);
        })
        .catch(res => {
          dispatch({ type: UNAVAILABLE_EMAIL, err: res.response.data.msg })
        })
  }

}


export const initialComplete = () => (dispatch) => {
  dispatch({ type: INITIAL_COMPLETE, complete: false})
}
export const postRegister = (userData) => (dispatch) => {
  axios.post(`${ROOT_URL}/renewalSignup`, userData)
    .then(res => {
      // console.log(res.data.msg)
      alert(`${res.data.msg}`)
      dispatch({ type: REGISTERED_STATUS, status: false, err:'', complete: true})
    })
    .catch(res => {
      let errTypes = {
        nameErr: ERR_NAME,
        emailErr: ERR_EMAIL,
        passwordErr: ERR_PASSWORD,
        passwordConfirmErr: ERR_PASSWORD_CONFIRM,
        passwordMismatch: ERR_PASSWORD_MISMATCH,
        roadAddrErr: ERR_ROAD_ADDR,
        detailAddrErr: ERR_DETAIL_ADDR
      }
      res.response.data.map(err => dispatch({ type: errTypes[err.type] ,err: err.msg, name: err.type}))
    })
}

export const emptyErr = (name) => (dispatch) => {
  dispatch({ type: ERR_EMPTY, name, err: "" })
}






export const tempoLogOut = (history) => (dispatch) => {
  if(confirm('로그아웃 하시겠습니까?')){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    dispatch({type: UNAUTH_USER})
    history.replace('/')
  }
}
