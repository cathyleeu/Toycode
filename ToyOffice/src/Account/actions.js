// import axios from 'axios'
// const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'


export const IS_MODIFYING_INFO = 'IS_MODIFYING_INFO'
export const IS_DEFALUT_MODI = 'IS_DEFALUT_MODI'
export const IS_COMPLETE_MODI = 'IS_COMPLETE_MODI'

// dispatch({type: IS_DEFALUT_MODI_MNG})

export const isDefalutModi = (user) => (dispatch) => {
  dispatch({type: IS_DEFALUT_MODI, user})
}


export const isModifyingInfo = (modiType, modiKey, modiTxt) => (dispatch) => {
  console.log("isModifyingInfo",modiType, modiKey, modiTxt);
  dispatch({type: IS_MODIFYING_INFO, modiType, modiKey, modiTxt})
}

export const isCompoleteModi = (modiType, data) => (dispatch) => {
  console.log('isCompoleteModi', data);
  dispatch({type: IS_COMPLETE_MODI})
}
