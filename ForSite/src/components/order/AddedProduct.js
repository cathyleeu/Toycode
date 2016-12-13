import React, { PropTypes } from 'react'

const AddedProduct = ({ price, title, img }) => (
  <div>
    <p>{title} - {price}원</p>
  </div>
)

export default AddedProduct
