import * as types from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3090'

export const addKinderClass = (classname, students, id) => ({
  type: types.ADD_KINDERCLASS,
  classname, students, id
})

export const addKinder = (kinderName) => ({
  type: types.ADD_KINDER,
  kinderName
})

export function completedAddKinder(KinData) {
  const user = localStorage.getItem('email')
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${user}`, KinData).then(response => {
      console.log(response.data)
      dispatch({type: types.COMPLETE_ADD_KINDER})
    })
  }
}
