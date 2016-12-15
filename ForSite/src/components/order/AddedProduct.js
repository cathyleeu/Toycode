import React, { PropTypes } from 'react'

const AddedProduct = ({ price, title, amount, eachTotal }) => (
  <div>
    <p>{title} - {price}원 * {amount}개 = {eachTotal}</p>
  </div>
)

export default AddedProduct
