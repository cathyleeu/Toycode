import React, { PropTypes } from 'react'
import Product from './Product'

const Cart = ({ books, total }) => {
  const hasBooks = books.length > 0
  const nodes = hasBooks ? (
    books.map(book =>
      <Product
        title={book.title}
        price={book.price}
        key={book.id}
      />
    )
  ) : (
    <em> 상품을 담아주세요. </em>
  )
  return (
    <div>
      <h3>주문서</h3>
      <div>{nodes}</div>
    </div>
  )
}

export default Cart
