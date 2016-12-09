import React, { PropTypes } from 'react'
import Product from './Product'



const ProductItem = ({book, onAddToCartClicked}) => (
  <div>
    <Product
      title={book.title}
      price={book.price}
      img={book.img}
    />
    <form className="quantity">
      <input type="number" placeholder="수량입력"/>
      <button
        disabled={book.quantity > 0 ? '' : 'disabled'}
        onClick={onAddToCartClicked}
      >
        {book.quantity > 0 ? '장바구니': '매진'}</button>
    </form>
  </div>
)

// ProductItem.propTypes = {
//   onAddToCartClicked: PropTypes.func.isRequired
// }

{/* <button onClick={onAddToCartClicked}>장바구니</button> */}
export default ProductItem
