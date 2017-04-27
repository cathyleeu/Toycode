import axios from 'axios'

export const START_INVOICES_FETCH = "START_INVOICES_FETCH"
export const COMPLETE_INVOICES_FETCH = "COMPLETE_INVOICES_FETCH"


export const isGetIVesByUser = () => (dispatch) => {
  dispatch({type: START_INVOICES_FETCH})
  const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
  const user = localStorage.getItem('email')
  axios.get(`${ROOT_URL}/invoices/${user}`).then((detail) => {
     dispatch({
       type: COMPLETE_INVOICES_FETCH,
       detail : detail.data
     })
   })
}
