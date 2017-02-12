import * as types from './types'
import axios from 'axios'
import {fetchUser} from './index.js'


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
  address: kinder.Address,
  phone : kinder.Phone,
  manager: kinder.Manager,
  managerPh: kinder.ManegerPh,
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
  status: !status
})


//TODO: pending 문제 해결해야함.
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'
export const completedAddKinder = (KinData) => (dispatch, getState) => {
  const user = localStorage.getItem('email')
  axios.put(`${ROOT_URL}/user/${user}`, KinData)
  dispatch(fetchUser())
  dispatch({type: types.COMPLETE_ADD_KINDER, status: false})
  alert('수정이 완료되었습니다.')
}
