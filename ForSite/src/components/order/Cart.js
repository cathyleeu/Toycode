import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'

const Cart = ({books, selected, goodsSelect, goodsDelete}) => {
  const nodes = books.map((book, index) =>
    <div key={index}>
        <AddedProduct
          title={book.title}
          price={book.price}
          id={book.id}
          goodsSelect={goodsSelect}
        />
        <button onClick={() => goodsDelete(book.id)}>삭제</button>
    </div>
      )
  const each = selected.map(each => (
    <div key={each.id} value={each.total}>
      <p>{each.title} {each.amount} </p>
    </div>
  ));
  const total = selected.reduce((sum, each) => (sum + each.price * each.amount), 0);

  return (
    <div>
      <h3>주문서</h3>
      { nodes.length == 0 ?
        <strong>상품을 담아주세요.</strong> :
        <div>
          <div>
            {nodes}

          </div>
          <hr />
          <div>{each}</div>
          <div>{total}</div>
        </div>
      }
    </div>
  )
}

export default Cart
