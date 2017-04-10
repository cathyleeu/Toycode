import React, {Component} from 'react'
import CustomModal from './CustomModal'

class AllUsersDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: "user-info",
      modalOpen: 'none'
    }
  }
  handleClick = (e) => {
    if(this.state.open) {
      this.setState({ open: false, class: "user-info" })
    } else {
      this.setState({ open: true, class: "user-info open" })
    }
  }
  handleOpenModal = (block) => {
    this.setState({modalOpen: block})
  }
  handleCloseModal = (none) => {
    this.setState({modalOpen: none})
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
          <button onClick={() => this.handleOpenModal('block')}>M</button>
        </div>
        <CustomModal
          ModalOpen={this.state.modalOpen}
          handleCloseModal={this.handleCloseModal} 
          handleOpenModal={this.handleOpenModal}
          user={user}/>
        <div className="user-info-detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default AllUsersDetail


//<p> 사업자 번호: {user.branch.license} | 업태: {user.branch.bizType} | 종목:{user.branch.bizItems} </p>
