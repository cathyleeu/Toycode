import React from 'react'
import './ProductsList.css';

const ProductsList = ({title, children}) => (
  <div className="Container has-Header">
    <h4>{title}</h4>
    <div className="Products-List">{children}</div>
  </div>
)

export default ProductsList
