import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'
import Invoice from './Invoice'

const Cart = ({books, selected, goodsSelect, goodsDelete, requestInvoice,user}) => {
  const nodes = books.map((book, index) =>
        <AddedProduct
          key={index}
          title={book.title}
          price={book.price}
          id={book.id}
          goodsSelect={goodsSelect}
          goodsDelete={goodsDelete}
        />

      )
  const each = selected.map(each => (
    <div key={each.id} value={each.total}>
      <p>{each.title} {each.amount} {each.amount*each.price}</p>
    </div>
  ));
  const total = selected.reduce((sum, each) => (sum + each.price * each.amount), 0);
  return (
    <div>
      { nodes.length == 0 ?
        <strong> 상품을 선택해 주세요.</strong> :
        <Invoice
          nodes={nodes}
          total={total}
          requestInvoice={requestInvoice}
          user={user}
          selected={selected} />
      }
    </div>
  )
}

export default Cart
