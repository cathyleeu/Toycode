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
          type="text"
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.readOnly}
        />
      </td>
    )
  }
}

export default AccountTableTd
