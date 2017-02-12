import * as types from '../constants/types'
import axios from 'axios'
// import {fetchUser} from './index.js'


let nextKinId = 0
export function createKinder(_id){
  return {
    type: types.CREATE_KINDER,
    kinderId: `${_id}_${nextKinId++}`
  }
}


export const updateKinder = (kinder, branchCode, id) => ({
  type: types.UPDATE_KINDER,
  name: kinder.Name,
  zipNo: kinder.zipNo,
  detailAddr: kinder.detailAddr,
  roadAddr: kinder.roadAddr,
  phone : kinder.Phone,
  manager: kinder.Manager,
  managerPh: kinder.ManagerPh,
  branchCode,
  id
})

export const deleteKinder = (id) => ({
  type: types.DELETE_KINDER,
  id
})

let nextKinClassId = 0
export const createKinderClass = (id) => ({
  type: types.CREATE_KINDER_CLASS,
  classId: `${id}_${nextKinClassId++}`
})

export const updateKinderClass = (classname, students, id, parentId, classId) => ({
  type: types.UPDATE_KINDER_CLASS,
  classname, students, id, parentId, classId
})

export const deleteKinderClass = (id) => ({
  type: types.DELETE_KINDER_CLASS,
  id
})

export const addChild = (childId) => ({
  type: types.ADD_KINDER,
  childId
})


export const addClass = (classId, childId, id) => ({
  type: types.ADD_CLASS,
  classId, childId, id
})

export const editKinder = (status) => ({
  type: types.EDITING_KINDER,
  branchEdit: !status
})



const ROOT_URL = 'http://localhost:3090'
export const completedAddKinder = (KinData) => (dispatch, getState) => {
  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/kinder`, KinData)
  dispatch({type: types.COMPLETE_ADD_KINDER, branchEdit: false})
  alert('수정이 완료되었습니다.')
}

export const editUser = (status) => ({
  type: types.EDITING_USER,
  userEdit: !status
})

export const updateUser = (info) => {
  const { a_manager,a_email,a_phone,e_manager,e_email,e_phone } = info
  return({
    type: types.UPDATE_USER,
    a_manager, a_email, a_phone, e_manager, e_email, e_phone
  })
}
export const editedUser = (KinData) => (dispatch, getState) => {
  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}/info`, KinData)
  dispatch({type: types.EDITED_USER, userEdit: false})
  alert('수정이 완료되었습니다.')
}

export const requestRefundByUser = (refundData) => {
  const { userName, userEmail, userCode, refundType, delivery, requestDesc } = refundData;
  const { to, address, phone } = delivery;
  const { zipNo, roadAddr, detailAddr } = address;
  return({
    type: types.REQUEST_REFUND_BY_USER,
    userName, userEmail, userCode, refundType, requestDesc,
    to, phone, zipNo, roadAddr, detailAddr
  })
}

export const postToRefundServer = (refundData) => ((dispatch) => {
  axios.post(`${ROOT_URL}/return`, refundData)
    .then(response => {
      dispatch({ type: types.REFUND_REQUEST })
      alert('환불신청이 접수되었습니다.')
    })
    .catch((e) => {
      dispatch({ type: types.REFUND_FAILURE })
      alert('환불신청 접수를 실패했습니다. 문의번호로 환불 접수해주세요.')
      console.log('환불접수 에러',e);
    })
})
