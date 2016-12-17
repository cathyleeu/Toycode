import React, { PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({books, amount, onAddToOrder,controlFunc, qutt}) => {
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
        />
      )
    ) : (
      <em> 상품을 담아주세요. </em>
    )
  const checkout = nodes.length > 0 ? (
    <div>
      <button>주문하기</button>
    </div>
  ): false
  return (
    <div>
      <h3>주문서</h3>
      <div>{nodes}</div>
      <div>{checkout}</div>
      <hr />

      {/* <p>총 가격: {total}</p> */}
    </div>
  )
}

export default Cart
