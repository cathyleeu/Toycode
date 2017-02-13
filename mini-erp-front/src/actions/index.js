import * as types from './types'
import axios from 'axios'



const currentPage = 1
const countPerPage = 10
const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0'
const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do'

export function searchAddress(location){
  return function(dispatch) {
    axios.get(`${searchUrl}?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(location)}&confmKey=${confmKey}&resultType=json`)
    .then((address) => {
      dispatch({type:types.SEARCH_ADDRESS})
      dispatch({
        type:types.COMPLETE_ADDRESS_FETCH,
        juso: address.data.results.juso
      })
    })
  }
}

export const selectedJuso = (selectedJuso) => ({
  type: types.SELECTED_JUSO,
  zipNo: selectedJuso.zipNo,
  roadAddr: selectedJuso.roadAddr,
  detailAddr: selectedJuso.detailAddr || ''
})
