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

//서버에서 다 했을 때 클라이언트에서 실행될 코드를 담아논 것이 콜백이다!!
//서버에서 받아올 때 무조건 콜백해야한다. 호호

// (cb, timeout) => setTimeout(() => cb(request)
//
// function(cb, timeout) {
//   setTimeout(function() {
//     cb(request);
//   }, timeout || TIMEOUT)
// }
