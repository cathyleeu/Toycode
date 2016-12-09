import React, { PropTypes } from 'react'

const Product = ({ price, title, img }) => (
  <div className="listCard">
    <img src={img} />
    <p>{title} - {price}원</p>
  </div>
)

export default Product
