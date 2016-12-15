import React, { PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({ books, total, amount }) => {
  console.log('books:',books);
  console.log('total:',total);
  console.log('amount:',amount);


  // const hasBooks = Object.assign({}, products)

  const nodes = books !== undefined ? (
    books.map(book =>
      <AddedProduct
        title={book.title}
        price={book.price}
        key={book.id}
        amount={amount[book.id]}
        eachTotal={amount[book.id]*book.price}
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
      <hr />
      <p>총 가격: {total}</p>
    </div>
  )
}

export default Cart
