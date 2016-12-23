import React, { Component, PropTypes } from 'react'
import Product from './Product'

const ProductItem = ({book, onAddToCartClicked }) => (
  <div onClick={onAddToCartClicked}>
    <Product
      title={book.title}
      price={book.price}
      img={book.img}
      className={'listCard'}
    />
  </div>
)


export default ProductItem
