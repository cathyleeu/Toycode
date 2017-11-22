import React, {PureComponent} from 'react'

export default class ToyCodeInput extends PureComponent {
  state = {
    value: this.props.value
  }
  componentWillReceiveProps(newProps){
    if(newProps.value !== this.props.value){
      this.setState({ value: newProps.value})
    }
  }
  render(){
    let { handleChange, holder, name, readOnly, inputContStyle, label, inputStyle, inputType, handleBlur} = this.props;
    return(
      <div className={inputContStyle}>
        <label>{label}</label>
        <input
          type={inputType}
          className={inputStyle}
          value={this.state.value}
          placeholder={holder}
          name={name}
          onChange={handleChange}
          disabled={readOnly}
          onBlur={handleBlur}
        />
      </div>
    )
  }
}
