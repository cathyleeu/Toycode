import axios from 'axios'

export const START_INVOICES_FETCH = "START_INVOICES_FETCH"
export const COMPLETE_INVOICES_FETCH = "COMPLETE_INVOICES_FETCH"
export const IS_SAVE_MODI_ITEMS = 'IS_SAVE_MODI_ITEMS'
export const IS_CLOSE_MODI_MODAL = 'IS_CLOSE_MODI_MODAL'
export const IS_MODI_GOODS_QUTT = 'IS_MODI_GOODS_QUTT'
export const IS_DELETE_GOODS = 'IS_DELETE_GOODS'
export const IS_CANCLE_MODI = 'IS_CANCLE_MODI'
export const IS_CANCLE_ALL_GOODS = 'IS_CANCLE_ALL_GOODS'
export const IS_REQUEST_MODI_IVES = 'IS_REQUEST_MODI_IVES'


const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const isGetIVesByUser = () => (dispatch) => {
  dispatch({type: START_INVOICES_FETCH})
  const user = localStorage.getItem('email')
  axios.get(`${ROOT_URL}/invoices/${user}`).then((detail) => {
    console.log("compolete",detail);
     let modi = detail.data.find(item => item.modifiability === true)
     dispatch({ type: COMPLETE_INVOICES_FETCH, detail : detail.data })
     dispatch({type: IS_SAVE_MODI_ITEMS , goods: modi ? modi.requestedGoods : []})
   })
}
// export const isOpenModiModal = (goods) => (dispatch) => {
//   console.log("isOpenModiModal", goods);
//   dispatch({type: IS_OPEN_MODI_MODAL, goods})
// }
export const isDeleteGoods = (name) => (dispatch) => {
  dispatch({type: IS_DELETE_GOODS, name})
}
export const isModiGoodsQutt = (name, qutt) => (dispatch) => {
  dispatch({ type: IS_MODI_GOODS_QUTT, name, qutt})
}
// export const isModiIvesDetail = (goods) => (dispatch) => {
//   console.log("IS_MODI_IVES_DETAIL", goods);
//   dispatch({type: IS_MODI_IVES_DETAIL, goods})
// }
//
export const isRequestModi = (user, iv, goods) => (dispatch) => {
  console.log("isRequestModi");
  dispatch({type: IS_REQUEST_MODI_IVES})
  axios.put(`${ROOT_URL}/invoices/${user}/${iv}`, goods).then((detail) => {
     dispatch(isGetIVesByUser())
   })
}
export const isCancleModi = () => (dispatch) => {
  console.log("isCancleModi");
  dispatch({type: IS_CANCLE_MODI})
}

export const isCancleAll = (user, iv) => (dispatch) => {
  axios.delete(`${ROOT_URL}/invoices/${user}/${iv}`).then((res) => {
    dispatch({type: IS_CANCLE_ALL_GOODS})
    dispatch(isGetIVesByUser())
  })
}
