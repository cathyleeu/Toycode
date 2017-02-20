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
        <button onClick={this.handleClick}>상세보기</button>
        <div className="IV-Goods-abbr">
          <div className="IV-Goods-abbr-top">
            <p> 지사명 : {user.branch.name} | {user.code} | {user.branch.repr} | {user.email} </p>
            <p> 사업자 번호: {user.branch.license} | 업태: {user.branch.bizType} | 종목:{user.branch.bizItems} </p>
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
