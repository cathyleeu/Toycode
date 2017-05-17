import React, {PureComponent} from 'react'

class AccountManagerInput extends PureComponent {
  state = {
    value: this.props.value
  }
  componentWillReceiveProps(newProps){
    if(newProps.value !== this.props.value){
      this.setState({ value: newProps.value})
    }
  }
  render(){
    return(
      <div className="AccountManager-Input">
        <p>{this.props.label}</p>
        <input
          value={this.state.value}
          placeholder={this.props.holder}
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.readOnly}
        />
      </div>
    )
  }
}

export default AccountManagerInput
