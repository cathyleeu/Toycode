import React, {Component} from 'react'


class AllUsersDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: "user-info"
    }
  }
  handleClick = (e) => {
    if(this.state.open) {
      this.setState({ open: false, class: "user-info" })
    } else {
      this.setState({ open: true, class: "user-info open" })
    }
  }
  render(){
    const { user } = this.props;
    return(
      <div className={this.state.class}>
        <div className="all-user-abbr">
          <button onClick={this.handleClick}>+</button>
          <div className="all-user-name">{user.branch.name}</div>
          <div className="all-user-info">
            <p>{user.code} | {user.branch.repr} | {user.email} </p>
            <p>{user.branch.address.zipNo} | {user.branch.address.roadAddr} | {user.branch.address.detailAddr}</p>
          </div>
        </div>
        <div className="user-info-detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default AllUsersDetail


//<p> 사업자 번호: {user.branch.license} | 업태: {user.branch.bizType} | 종목:{user.branch.bizItems} </p>
