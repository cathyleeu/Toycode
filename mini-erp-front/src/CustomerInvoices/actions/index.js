import * as CSTIV from '../constants'
import axios from 'axios'

const ROOT_URL = process.env.SERVER_URL || 'http://localhost:3090'
export function fetchAllUserIVes() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/invoices`)
      .then((response) => {
        dispatch({
          type: CSTIV.FETCH_ALL_USER_IVES,
          response: response.data
        })
      })
  }
}
