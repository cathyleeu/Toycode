import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'
import Address from './Address'

const Cart = ({books, selected, goodsSelect, goodsDelete, requestInvoice,user}) => {
  const nodes = books.map((book, index) =>
    <div key={index}>
        <AddedProduct
          title={book.title}
          price={book.price}
          id={book.id}
          goodsSelect={goodsSelect}
          goodsDelete={goodsDelete}
        />

    </div>
      )
  const each = selected.map(each => (
    <div key={each.id} value={each.total}>
      <p>{each.title} {each.amount} {each.amount*each.price}</p>
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
          <Address
            requestInvoice={requestInvoice}
            user={user}
            selected={selected}
          />
        </div>
      }
    </div>
  )
}

export default Cart
