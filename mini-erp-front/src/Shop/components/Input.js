import React from 'react'


class Input extends React.PureComponent{
  render(){
    return(
      <input
        className={this.props.className ? this.props.className : "form-control"}
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        name={this.props.name}
        id={this.props.id}
      />
    )
  }
}


export default Input
