import axios from 'axios'


export const FETCH_ALL_USER_INFO = 'FETCH_ALL_USER_INFO'
export const FETCH_ALL_KCLASS_NAMES = 'FETCH_ALL_KCLASS_NAMES'
export const IS_SUCCEEDED_MODI_BY_ADMIN = 'IS_SUCCEEDED_MODI_BY_ADMIN'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const fetchAllUserInfo = () => (dispatch) => {
  axios.get(`${ROOT_URL}/user`)
       .then((response) => dispatch({ type: FETCH_ALL_USER_INFO, response: response.data }))
}

export const fetchAllKClassNames = () => (dispatch) => {
  axios.get(`${ROOT_URL}/login`)
       .then((response) => dispatch({ type: FETCH_ALL_KCLASS_NAMES, response: response.data }))
       .catch(err => console.log(err))
}

export const isUpdateByAdmin = (ele, code) => (dispatch) => {
  axios.put(`${ROOT_URL}/user/${code}`, ele)
    .then(res => dispatch({type: IS_SUCCEEDED_MODI_BY_ADMIN}))
}
