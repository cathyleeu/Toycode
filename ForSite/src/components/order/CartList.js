import React, { PropTypes } from 'react'
import AddedProduct from './AddedProduct'
const CartList = ({book, onAddToOrder, amount}) => (
  <div
    onClick={onAddToOrder}>
    <AddedProduct
      title={book.title}
      price={book.price}
    />
  </div>
)

export default CartList
