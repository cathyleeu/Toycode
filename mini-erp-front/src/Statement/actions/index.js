import axios from 'axios'



export const FETCH_ALL_FFMT = 'FETCH_ALL_FFMT'





const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
export const fetchAllFFMT = () => (dispatch) => {
  axios.get(`${ROOT_URL}/invoices/status/ffmt`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_FFMT,
        response: response.data
      })
    })
}
