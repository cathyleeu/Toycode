import axios from 'axios'
import { FETCH_BOOKS } from './types'

const ROOT_URL = 'http://localhost:3090'

export function fetchBooks() {
  const request = axios.get(`${ROOT_URL}/books`)
  //$ROOT_URL+'/books' => es6 `${ROOT_URL}/books`
  return {
    type: FETCH_BOOKS,
    // FETCH_BOOKS라는 type일때 request를 payload로 전달한다.
    payload: request
  }
}
