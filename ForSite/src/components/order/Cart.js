import React, { PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({ books, total }) => {
  console.log('books:',books);
  console.log('total:',total);


  // const hasBooks = Object.assign({}, products)

  const nodes = books !== undefined ? (
    books.map(book =>
      <AddedProduct
        title={book.title}
        price={book.price}
        key={book.id}
        // quantity={book.quantity}
      />
    )
  ) : (
    <em> 상품을 담아주세요. </em>
  )
  return (
    <div>
      <h3>주문서</h3>
      <div>{nodes}</div>
      <p>{total}</p>
    </div>
  )
}

export default Cart
