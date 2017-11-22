import axios from 'axios'
const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090'

export const START_BOOKS_FETCH = 'START_BOOKS_FETCH'
export const COMPLETE_BOOKS_FETCH = 'COMPLETE_BOOKS_FETCH'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ENTER_GOODS_QUTT = 'ENTER_GOODS_QUTT'
export const ENTER_DELIVERY_INFO = 'ENTER_DELIVERY_INFO'
export const DELETE_GOODS = 'DELETE_GOODS'
export const SEARCH_ADDRESS = 'SEARCH_ADDRESS'
export const COMPLETE_ADDRESS_FETCH = 'COMPLETE_ADDRESS_FETCH'
export const REQUEST_GOODS_ORDER = 'REQUEST_GOODS_ORDER'
export const COMPLETE_GOODS_ORDER = "COMPLETE_GOODS_ORDER"

const currentPage = 1;
const countPerPage = 200;
const confmKey = 'U01TX0FVVEgyMDE3MDEyMzA5MzE0NDE4NTA0';
const searchUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';

export const searchAddress = (location) => (dispatch) => {
  axios.get(`${searchUrl}?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(location)}&confmKey=${confmKey}&resultType=json`)
  .then((address) => {
    dispatch({type:SEARCH_ADDRESS})
    dispatch({
      type: COMPLETE_ADDRESS_FETCH,
      juso: address.data.results.juso
    })
  })
}


export const fetchBooks = () => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/books`)
  .then((books) => dispatch({ type: COMPLETE_BOOKS_FETCH, books: books.data }))
  .catch(err => console.log("fetchBooks", err))
}

export const addToCartUnsafe = (book) => (dispatch) => {
  alert('장바구니에 담겼습니다.')
  dispatch({ type: ADD_TO_CART, book })
}

export const enterGoodsQutt = (code, qutt) => (dispatch) => {
  dispatch({ type: ENTER_GOODS_QUTT, code, qutt })
}
export const enterDeliveryDetail = (deliveryInfo) => (dispatch) => {
  dispatch({ type: ENTER_DELIVERY_INFO, deliveryInfo})
}

export const requestGoodsOrder = (deli, goods, user) => (dispatch) => {
  let requestedGoods = [], totalSales = 0;
  goods.forEach( g => {
    let item = {};
    item['sales'] = (g.dPrice*g.amount)*0.6;
    item['qutt']= g.amount;
    item['price'] = g.dPrice*0.6;
    item['name'] = `${g.title} ${g.level}단계/${g.volume}권`;
    return requestedGoods.push(item);
  })
  goods.forEach(g => {
    totalSales += (g.dPrice*g.amount)*0.6
    return totalSales
  })
  let iv = {
    userName: user.branch.name,
    userEmail: user.email,
    userCode: user.code,
    requestDesc: deli.rqcontent,
    totalSales: goods.map(g => g.amount*g.dPrice*0.6 ).reduce((a,b)=>a+b),
    requestedGoods,
    delivery: {
      to: deli.recipient,
      address: {
        zipNo: deli.zipNo,
        roadAddr: deli.roadAddr,
        detailAddr: deli.detailAddr
      },
      phone: deli.phone,
    }
  }
  axios.post(`${ROOT_URL}/invoices`, iv)
    .then(res => {
      dispatch({ type: COMPLETE_GOODS_ORDER })
    })
  // dispatch({ type: REQUEST_GOODS_ORDER})
}

export const goodsDelete = (code) => ({ type: DELETE_GOODS, code })
