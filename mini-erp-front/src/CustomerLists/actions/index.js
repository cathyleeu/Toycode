import axios from 'axios'


export const FETCH_ALL_USER_INFO = 'FETCH_ALL_USER_INFO'
export const FETCH_ALL_KCLASS_NAMES = 'FETCH_ALL_KCLASS_NAMES'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export function fetchAllUserInfo() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user`)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_USER_INFO,
          response: response.data
        })
      })
  }
}

export function fetchAllKClassNames() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/login`)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_KCLASS_NAMES,
          response: response.data
        })
      }).catch(err => console.log(err))
  }
}
