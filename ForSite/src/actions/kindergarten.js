import * as types from './types'
import axios from 'axios'



let nextKinderId = 0
export const createKinder = (id) => ({
  type: types.CREATE_KINDER,
  kinderId: `${id}_${nextKinderId++}`
})

export const updateKinder = (kinderName) => ({
  type: types.UPDATE_KINDER,
  kinderName
})

export const deleteKinder = (nodeId) => ({
  type: types.DELETE_KINDER,
  nodeId
})

let nextKinClassId = 0
export const createKinderClass = (id) => ({
  type: types.CREATE_KINDER_CLASS,
  classId: `${id}_${nextKinClassId++}`
})

export const deleteKinderClass = (nodeId) => ({
  type: types.DELETE_KINDER_CLASS,
  nodeId
})

export const addChild = (childId) => ({
  type: types.ADD_CHILD,
  childId
})

const fakeId = 0
export const addClass = (classId, childId, id, nodeId) => ({
  type: types.ADD_CLASS,
  classId, childId, id, nodeId
})

export const removeChild = (nodeId, childId) => ({
  type: types.REMOVE_CHILD,
  nodeId,
  childId
})




const ROOT_URL = 'http://localhost:3090'
export function completedAddKinder(KinData) {
  const user = localStorage.getItem('email')
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${user}`, KinData).then(response => {
      console.log(response.data)
      dispatch({type: types.COMPLETE_ADD_KINDER})
    })
  }
}
