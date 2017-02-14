import React from 'react'
import Product from './Product'

const ProductItem = ({book, onAddToCartClicked }) => (
  <div onClick={onAddToCartClicked} className="goods-list-ctx">
    <Product
      title={book.title}
      img={book.img}
      className={'listCard'}
    />
  </div>
)


export default ProductItem
