import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({books, selected, toggleSelect}) => {
  const nodes = books.map((book, index) =>
        <AddedProduct
          title={book.title}
          price={book.price}
          key={index}
          value={book.amount}
          id={book.id}
          toggleSelect={toggleSelect}
        />
      )
  const each = selected.map(each => (
    <div key={each.id} value={each.total}>
      <p>{each.title} : {each.total}</p>
    </div>
  ));
  const total = selected.reduce((sum, each) => (sum + each.price * each.amount), 0);

  return (
    <div>
      <h3>주문서</h3>
      { nodes.length == 0 ?
        <strong>상품을 담아주세요.</strong> :
        <div>
          <div>{nodes}</div>
          <hr />
          <div>{each}</div>
          <div>{total}</div>
        </div>
      }
    </div>
  )
}

export default Cart
