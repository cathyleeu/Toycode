import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'


export const IS_MODIFYING_INFO = 'IS_MODIFYING_INFO'
export const IS_DEFALUT_MODI = 'IS_DEFALUT_MODI'
export const IS_COMPLETE_MODI = 'IS_COMPLETE_MODI'

// dispatch({type: IS_DEFALUT_MODI_MNG})


const localUser = localStorage.getItem('email')

export const isDefalutModi = (user) => (dispatch) => {
  dispatch({type: IS_DEFALUT_MODI, user})
}


export const isModifyingInfo = (modiType, modiKey, modiTxt) => (dispatch) => {
  dispatch({type: IS_MODIFYING_INFO, modiType, modiKey, modiTxt})
}

export const isCompoleteModi = (modiType, data) => (dispatch) => {
  console.log('isCompoleteModi', modiType, data);
  let {
    A_phone,
    A_email,
    A_manager,
    E_phone,
    E_email,
    E_manager,
  } = data,
    obj = {
      account: {
        A_phone,
        A_email,
        A_manager
      },
      education: {
        E_phone,
        E_email,
        E_manager
      }
    }
  dispatch({type: IS_COMPLETE_MODI})
  axios.put(`${ROOT_URL}/user/${localUser}/info`, obj)
  alert('수정이 완료되었습니다.')
}

//
// console.log(KinData);
//   const user = localStorage.getItem('email')
//   axios.put(`${ROOT_URL}/user/${user}/info`, KinData)
//   dispatch({type: types.EDITED_USER, userEdit: false})
//   alert('수정이 완료되었습니다.')
