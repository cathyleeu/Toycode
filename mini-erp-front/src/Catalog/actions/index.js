import axios from 'axios';
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'


export const IS_MODIFYING_GOODS = 'IS_MODIFYING_GOODS'
export const IS_SUCCEEDED_MODI = 'IS_SUCCEEDED_MODI'

export const ModifyingGoods = (ele, code) => (dispatch) => {
  axios.put(`${ROOT_URL}/books/${code}`, ele)
    .then(res => dispatch({type: IS_SUCCEEDED_MODI}))
}
