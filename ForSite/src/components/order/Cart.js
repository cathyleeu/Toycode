import React, { PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({books, amount, onAddToOrder,controlFunc, qutt}) => {
  // console.log('Cart.js books:',books);
  // console.log('Cart.js amount:',amount);
  const nodes = books !== undefined ? (
      books.map(book =>
        <AddedProduct
          title={book.title}
          price={book.price}
          key={book.id}
          id={book.id}
          controlFunc={controlFunc}
          qutt={qutt}
          onAddToOrder={onAddToOrder}
          // amount={amount[book.id]}
          // eachTotal={amount[book.id]*book.price}
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
        {/* <p>총 가격: {total}</p> */}
      </div>
    )
}

export default Cart
