import axios from 'axios'



export const FETCH_ALL_RQT = 'FETCH_ALL_RQT'





const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
export const fetchAllRQT = () => (dispatch) => {
  axios.get(`${ROOT_URL}/invoices/status/rqt`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_RQT,
        response: response.data
      })
    })
}

export const getDayStatement = (rqt) => (dispatch) => {
  window.open(`${ROOT_URL}/xlsx`, '_blank')
}
