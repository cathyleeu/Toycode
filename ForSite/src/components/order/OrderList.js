import React, { Component, propTypes } from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../../actions/order'
import ProductsList from './ProductsList'
import ProductItem from './ProductItem'



const OrderList = ({books,addToCartUnsafe}) => (
  <ProductsList title="키즈코딩 교재">
    {books.map(book =>
      <ProductItem
        key={book.id}
        book={book}
        onAddToCartClicked={() => {
          addToCartUnsafe(book.id, book.title, book.price)
        }}
      />
    )}
  </ProductsList>
)



function mapStateToProps(state){
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, { addToCartUnsafe })(OrderList)
