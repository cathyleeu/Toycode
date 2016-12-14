import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import Cart from './Cart'


const OrderForm = ({ books, total }) => (
  <Cart
    books={books}
    total={total}
  />

)


function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    total: getTotal(state)
    // TODO: total도 뿌려줘야함.
  }
}

export default connect(mapStateToProps)(OrderForm)
