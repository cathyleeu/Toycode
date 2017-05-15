import React, {PureComponent} from 'react'

class AccountManagerInput extends PureComponent {
  render(){
    return(
      <div className="AccountManager-Input">
        <p>{this.props.label}</p>
        <input
          readOnly={this.props.readOnly}/>
      </div>
    )
  }
}

export default AccountManagerInput
