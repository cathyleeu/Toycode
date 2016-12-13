import {fetchBooks} from '../actions/fetch'
// import books from '../reducers/books'
import axios from 'axios'


// const books = fetchBooks() //.then((books) => { return books.data })
// debugger

const ROOT_URL = 'http://localhost:3090'
const request = axios.get(`${ROOT_URL}/books`).then((books) => { return books.data})


const TIMEOUT = 100

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(request), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
