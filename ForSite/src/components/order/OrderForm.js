import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import Cart from './Cart'


const OrderForm = ({ books}) => (
  <Cart
    books={books}
  />

)


function mapStateToProps(state){
  return {
    books: state.books
    // TODO: getCartProducts(state.books) 형식으로 주문한 책만 뽑아주는 필터링 코드가 필요함
    // TODO: total도 뿌려줘야함.
  }
}

export default connect(mapStateToProps)(OrderForm)
