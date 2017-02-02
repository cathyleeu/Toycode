import React from 'react'
import { connect } from 'react-redux'
import { getCartProducts, getAddedCart } from '../reducers/cart'
import { goodsSelect, goodsDelete, requestInvoice, getInvoices } from '../actions/cart'
import Cart from '../components/Cart'
import { bindActionCreators } from 'redux'


const CartContainer = ({books, goodsSelect, selected, goodsDelete, requestInvoice, user, getInvoices}) => (
   <Cart
    books={books}
    goodsSelect={goodsSelect}
    goodsDelete={goodsDelete}
    selected={selected}
    requestInvoice={requestInvoice}
    user={user}
    getInvoices={getInvoices}
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
    goodsSelect, goodsDelete, requestInvoice, getInvoices
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
