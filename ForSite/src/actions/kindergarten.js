import * as types from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3090'

export function addBranchKinder(KinData) {
  const user = localStorage.getItem('email')
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${user}`, KinData).then(response => {
      console.log(response.data)
    })
  }
}
