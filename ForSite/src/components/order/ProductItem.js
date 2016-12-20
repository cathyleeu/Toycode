import React, { Component, PropTypes } from 'react'
import Product from './Product'

const ProductItem = ({book, onAddToCartClicked, ref}) => (
  <div
    onClick={onAddToCartClicked}>
    <Product
      title={book.title}
      price={book.price}
      img={book.img}
    />
  </div>
)


export default ProductItem
