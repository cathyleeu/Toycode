import React, { PropTypes } from 'react'
import Product from './Product'

const Cart = ({ books, total, products }) => {
  console.log('Cart.js:',books);
  console.log('Cart.js:', products);
  const hasBooks = []
  hasBooks.push(products[books])
  console.log('hasBooks:', hasBooks);
  const nodes = hasBooks.length > 0 ? (

      <Product
        title={hasBooks.title}
        price={hasBooks.price}
        key={hasBooks.id}
      />

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
