import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../../actions/order'
import { getAddedCart } from '../../reducers'
import ProductsList from './ProductsList'
import ProductItem from './ProductItem'



const OrderList = ({books,addToCartUnsafe, selected}) => (
  <ProductsList title="키즈코딩 교재">
    {books.map((book, index) =>
      <ProductItem
        key={index}
        book={book}
        onAddToCartClicked={() => {
          {selected.map((Id) => Id.id).indexOf(book.id) == -1 &&
            addToCartUnsafe(book.id, book.title, book.price)
          }
        }}
      />
    )}
  </ProductsList>
)



function mapStateToProps(state){
  return {
    books: state.books,
    selected: getAddedCart(state)
  }
}

export default connect(mapStateToProps, { addToCartUnsafe })(OrderList)
