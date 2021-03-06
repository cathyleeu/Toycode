import React, { PureComponent } from 'react'

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
    let {
      handleChange,
      holder,
      name,
      readOnly,
      // inputContStyle,
      // inputStyle,
      inputType,
      handleBlur
    } = this.props;
    return(
        <input
          type={inputType}
          className="toycode_input"
          value={this.state.value}
          placeholder={`${holder} 을/를 기입해주세요.`}
          name={name}
          onChange={handleChange}
          disabled={readOnly}
          onBlur={handleBlur}
        />
    )
  }
}
