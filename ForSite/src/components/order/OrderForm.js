import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import Cart from './Cart'


const OrderForm = ({ books, total, amount }) => (
  <Cart
    books={books}
    total={total}
    amount={amount}
  />

)


function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    total: getTotal(state),
    amount: state.cart.quantityById
    // TODO: total도 뿌려줘야함.
  }
}

export default connect(mapStateToProps)(OrderForm)
