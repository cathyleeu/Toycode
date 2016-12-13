import React, { Component, propTypes } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
// import { addtocart } from './actions'
import { addToCart } from '../../actions/order'
import { getVisibleProducts } from '../../reducers/products'
// import * as actions from './actions'
// import ProductItem from './ProductItem'
import ProductsList from './ProductsList'
import ProductItem from './ProductItem'


const OrderList = ({books, addToCart }) => (
  <ProductsList title="키즈코딩 교재">
    {books.map(book =>
      <ProductItem
        key={book.id}
        book={book}
        // onAddToCartClicked={() => addtocart(book.id)}
        onAddToCartClicked={() => addToCart(book.id)}
      />
    )}
  </ProductsList>
)






function mapStateToProps(state){
  return {
    books: state.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addtocart
  }, dispatch)
}

// {* {this.props.books.map(this.renderBooks)} *}
export default connect(mapStateToProps, { addToCart })(OrderList)
// export default connect(mapStateToProps, mapDispatchToProps)(OrderList)

// export default OrderList
