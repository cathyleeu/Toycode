import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCartProducts, getAddedCart } from '../../reducers'
import { requestInvoice, requestQuantity, toggleSelect } from '../../actions/order'
import Cart from './Cart'
import {bindActionCreators} from 'redux'

//
 const OrderForm = ({books, toggleSelect, selected}) => (
   <Cart
    books={books}
    toggleSelect={toggleSelect}
    selected={selected}
   />
)

function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    selected: getAddedCart(state)
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleSelect:toggleSelect
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
