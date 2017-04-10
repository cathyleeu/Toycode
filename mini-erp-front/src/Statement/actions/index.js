import axios from 'axios'



export const FETCH_ALL_FFMT = 'FETCH_ALL_FFMT'
export const IS_GET_XLSX_FFMT_A_DAY = 'IS_GET_XLSX_FFMT_A_DAY'





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

export const getXlsxFFMTaDay = (date) => (dispatch) => {
  window.open(`${ROOT_URL}/xlsx/${date}/ffmt`, '_blank')
  dispatch({type: IS_GET_XLSX_FFMT_A_DAY})
}
