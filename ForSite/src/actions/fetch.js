import axios from 'axios'
import { FETCH_BOOKS } from './types'

const ROOT_URL = 'http://localhost:3090'
const request = axios.get(`${ROOT_URL}/books`).then((books) => { return books.data })



export function fetchBooks() {

  return {
    type: FETCH_BOOKS,
    // FETCH_BOOKS라는 type일때 request를 payload로 전달한다.
    payload: request
    // payload: request 를 통해 데이터가 전달되는 것임

  }
}

/* 이러한 것 자체를 action creator이라고 함
rateCourse(rating){
  return {
    type: PPPP,
    payload
  }
}
*/




// return function (dispatch) {
//   axios.get(`${ROOT_URL}/books`)
//     .then(request => {
//       dispatch({request})
//     })
// }
