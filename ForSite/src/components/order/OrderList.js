import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/order'
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
        onAddToCartClicked={() => addToCart(book.id)}
      />
    )}
  </ProductsList>
)


function mapStateToProps(state){
  return {books: state.books}
}


// {* {this.props.books.map(this.renderBooks)} *}
export default connect(mapStateToProps, { addToCart })(OrderList)

// export default OrderList
