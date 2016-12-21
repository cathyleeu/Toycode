import React from 'react'

const QuantityInput = (props) => (
  <input
    className="form-input"
    type={props.type}
    name={props.name}
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
)


export default QuantityInput
