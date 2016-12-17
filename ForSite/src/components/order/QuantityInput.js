import React from 'react'

const QuantityInput = (props) => (
  <input
    className="form-input"
    type={props.type}
    name={props.name}
    value={props.qutt}
    placeholder={props.placeholder}
    onChange={props.controlFunc}
  />
)
//
// QuantityInput.propTypes = {
// 	type: React.PropTypes.oneOf(['text', 'number']).isRequired,
// 	name: React.PropTypes.string.isRequired,
// 	controlFunc: React.PropTypes.func.isRequired,
// 	qutt: React.PropTypes.oneOfType([
// 		React.PropTypes.string,
// 		React.PropTypes.number,
// 	]).isRequired,
// 	placeholder: React.PropTypes.string,
// };


export default QuantityInput
