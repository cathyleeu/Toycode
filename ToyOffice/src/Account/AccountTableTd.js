import React, {PureComponent} from 'react'

class AccountTableTd extends PureComponent{
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
      <td colSpan={this.props.colSpan} className="AccountBranch-Input">
        <input
          value={this.state.value}
          readOnly={this.props.readOnly}
          type="text"
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </td>
    )
  }
}

export default AccountTableTd
