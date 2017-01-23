import * as types from './types'
import axios from 'axios'



const currentPage = 1
const countPerPage = 10
const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0'
const resultType = 'json'
const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do'

export function searchAddress(location){
  return function(dispatch) {
    axios.get(`${searchUrl}?currentPage=1&countPerPage=10&keyword=${location}&confmKey=${confmKey}&resultType=json`)
    .then((address) => {
      dispatch({type:types.SEARCH_ADDRESS})
      dispatch(renderAddress(address.data.results.juso))
    })
  }
}

export const renderAddress = (juso) => ({
  type:types.COMPLETE_ADDRESS_FETCH,
  juso
})
