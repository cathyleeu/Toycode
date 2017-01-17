import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCartProducts, getAddedCart } from '../reducers/cart'
import { goodsSelect, goodsDelete, requestInvoice } from '../actions/cart'
import Cart from '../components/Cart'
import { bindActionCreators } from 'redux'


const CartContainer = ({books, goodsSelect, selected, goodsDelete, requestInvoice, user}) => (
   <Cart
    books={books}
    goodsSelect={goodsSelect}
    goodsDelete={goodsDelete}
    selected={selected}
    requestInvoice={requestInvoice}
    user={user}
   />
)

function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    selected: getAddedCart(state),
    user: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    goodsSelect, goodsDelete, requestInvoice
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
