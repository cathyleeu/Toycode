import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCartProducts, getAddedCart } from '../../reducers'
import { goodsSelect, goodsDelete, requestInvoice } from '../../actions/order'
import Cart from './Cart'
import {bindActionCreators} from 'redux'


 const OrderForm = ({books, goodsSelect, selected, goodsDelete, requestInvoice}) => (
   <Cart
    books={books}
    goodsSelect={goodsSelect}
    goodsDelete={goodsDelete}
    selected={selected}
    requestInvoice={requestInvoice}
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
    goodsSelect, goodsDelete, requestInvoice
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
