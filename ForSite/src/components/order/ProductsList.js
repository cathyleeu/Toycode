import React, { PropTypes } from 'react'

const ProductsList = ({title, children}) => (
  <div>
    <h3>{title}</h3>
    <div className="orderList">{children}</div>
  </div>
)

export default ProductsList
