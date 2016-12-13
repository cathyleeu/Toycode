import React, { PropTypes } from 'react'
import Product from './Product'



const ProductItem = ({book, onAddToCartClicked}) => (
  <div>
    <Product
      title={book.title}
      price={book.price}
      img={book.img}
    />
    <div className="quantity">
      <input
        type="number"
        placeholder="수량입력"
        // value={quantity}
        />
      <input
        type="submit"
        disabled={book.quantity > 0 ? '' : 'disabled'}
        onClick={onAddToCartClicked}
        value = {book.quantity > 0 ? '장바구니': '매진'}/>
    </div>
  </div>
)

// ProductItem.propTypes = {
//   onAddToCartClicked: PropTypes.func.isRequired
// }

{/* <button onClick={onAddToCartClicked}>장바구니</button> */}
export default ProductItem
