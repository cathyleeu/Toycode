import React, {Component} from 'react'



class AccountTableHeader extends Component {
  state = {
    modi: this.props.modi
  }
  componentWillReceiveProps(newProps){
    console.log(newProps.modi)
    if(newProps.modi !== this.props.modi){
      this.setState({ modi: newProps.modi})
    }
  }
  render(){
    return(
      <div className="Account-table-top">
        <h3>{this.props.title}</h3>
        {this.state.modi ? <button onClick={this.props.onClickTrue}>수정하기</button> : <button onClick={this.props.onClickFalse}>수정완료</button>}
      </div>
    )
  }
}


export default AccountTableHeader
