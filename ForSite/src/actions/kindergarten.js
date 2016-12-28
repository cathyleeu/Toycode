import * as types from './types'
import axios from 'axios'


const kinderId = 0
// debugger
export const addKinder = (kinderName) => ({
  type: types.ADD_KINDER,
  kinderId: `${kinderName}_${kinderId}`
})




export const addKinderClass = (classname, students, id) => ({
  type: types.ADD_KINDERCLASS,
  classname, students, id
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
