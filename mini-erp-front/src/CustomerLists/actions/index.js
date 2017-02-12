import * as CSTLIST from '../constants'
import axios from 'axios'

const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
export function fetchAllUserInfo() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user`)
      .then((response) => {
        dispatch({
          type: CSTLIST.FETCH_ALL_USER_INFO,
          response: response.data
        })
      })
  }
}
