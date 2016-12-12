import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import Cart from './Cart'


const OrderForm = ({ books, products}) => (
  <Cart
    books={books}
    products={products}
  />

)


function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    products: state.books
    // TODO: getCartProducts(state.books) 형식으로 주문한 책만 뽑아주는 필터링 코드가 필요함
    // TODO: total도 뿌려줘야함.
  }
}

export default connect(mapStateToProps)(OrderForm)
