import * as CSTIV from '../constants'
import axios from 'axios'

const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
export const fetchAllUserIVes = () => (dispatch) => {
  axios.get(`${ROOT_URL}/invoices`)
    .then((response) => {
      dispatch({
        type: CSTIV.FETCH_ALL_USER_IVES,
        response: response.data
      })
    })
}


export const postTrackNumber = (tn, ivId) => (dispatch) => {
  console.log(tn)
  axios.put(`${ROOT_URL}/invoices/track/no/${ivId}`, {trackingNo:tn})
    .then((response) => {
      dispatch(fetchAllUserIVes())
      alert('등록완료')
      // console.log(response.data.status)

    })
}

// dispatch({
//   type: CSTIV.FETCH_ALL_USER_IVES,
//   response: response.data
// })
