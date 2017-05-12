import React, {PureComponent} from 'react'

class AccountTableTd extends PureComponent{
  state = {
    value: this.props.value
  }
  render(){
    return(
      <td colSpan={this.props.colSpan}>
        <input
          value={this.state.value}
          readOnly={this.props.readOnly}
          // onChange={this.}
        />
      </td>
    )
  }
}

export default AccountTableTd
