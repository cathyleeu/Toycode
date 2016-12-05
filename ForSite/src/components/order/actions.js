import axios from 'axios'
import { FETCH_BOOKS } from './types'

const ROOT_URL = 'http://localhost:3090'

export function fetchBooks() {
  const request = axios.get(ROOT_URL+'/books')
  return {
    type: FETCH_BOOKS,
    payload: request
  }
}
