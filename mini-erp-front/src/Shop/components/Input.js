import React from 'react'

const Input = (props) => (
  <input
    className={props.className ? props.className : "form-control"}
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onBlur={props.onBlur}
    name={props.name}
  />
)

export default Input
