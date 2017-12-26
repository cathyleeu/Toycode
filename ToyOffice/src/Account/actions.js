import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'


export const IS_MODIFYING_INFO = 'IS_MODIFYING_INFO'
export const IS_DEFALUT_MODI = 'IS_DEFALUT_MODI'
export const IS_COMPLETE_MODI = 'IS_COMPLETE_MODI'

// dispatch({type: IS_DEFALUT_MODI_MNG})


const localUser = localStorage.getItem('email')

export const isDefalutModi = (user) => (dispatch) => {
  console.log("cancle", user);
  dispatch({type: IS_DEFALUT_MODI, user})
}


export const isModifyingInfo = (modiType, modiKey, modiTxt) => (dispatch) => {
  dispatch({type: IS_MODIFYING_INFO, modiType, modiKey, modiTxt})
}

export const isCompoleteModi = (modiType, data) => (dispatch) => {
  console.log('isCompoleteModi', modiType, data);

  let temp = {}
  if(modiType === "manager") {
    let objKeys = Object.keys(data);
    objKeys.forEach( d => {
      if(d.match(/([A])\w+/g)){
        temp["account"] = {
          ...temp["account"],
          [d] : data[d]
        }
      } else {
        temp["education"] = {
          ...temp["education"],
          [d] : data[d]
        }
      }
    })
    data = temp;
  }
  // log.match(/([A])\w+/g)

  axios.put(`${ROOT_URL}/user/${localUser}/info/${modiType}`, data)
  alert('수정이 완료되었습니다.')
}

//
// console.log(KinData);
//   const user = localStorage.getItem('email')
//   axios.put(`${ROOT_URL}/user/${user}/info`, KinData)
//   dispatch({type: types.EDITED_USER, userEdit: false})
//   alert('수정이 완료되었습니다.')
