import React from 'react'

const Input = (props) => (
  <input
    className="form-control"
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
)

export default Input
