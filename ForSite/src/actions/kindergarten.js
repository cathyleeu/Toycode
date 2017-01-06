import * as types from './types'
import axios from 'axios'



let nextKinderId = 0
export const createKinder = (id, branchName, branchCode) => ({
  type: types.CREATE_KINDER,
  kinderId: `${id}_${nextKinderId++}`,
  branchName,
  branchCode
})

export const updateKinder = (kinder, id) => ({
  type: types.UPDATE_KINDER,
  name: kinder.Name,
  address: kinder.Address,
  phone : kinder.Phone,
  manager: kinder.Manager,
  managerPh: kinder.ManegerPh,
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



const ROOT_URL = 'http://localhost:3090'
export function completedAddKinder(KinData) {
  const user = localStorage.getItem('email')
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${user}`, KinData).then(response => {
      dispatch({type: types.COMPLETE_ADD_KINDER})
    })
  }
}
