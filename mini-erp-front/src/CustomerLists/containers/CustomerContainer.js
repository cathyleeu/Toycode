import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './CustomerContainer.css'



class CustomerContainer extends Component {
  componentWillMount(){
    this.props.fetchAllUserInfo()
  }
  render(){
    const {allUsers} = this.props
    return(
      <div className="has-Header Container">
        <h5>지사 상황</h5>
        <div className="cst-container">
          고객리스트
          { allUsers.map(
            (user , i) => (
                <div key={i}>
                  <p>{user.Code}</p>
                  <p>{user.email}</p>
                  <p>{user.branch.Name}</p>
                  <p>{user.branch.Address.detailAddr}</p>
                  <p>{user.branch.Address.roadAddr}</p>
                  <p>{user.branch.Address.zipNo}</p>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}




function mapStateToProps(state){
  return {
    allUsers: state.cstList.allUsers
  }
}

export default connect(mapStateToProps, actions)(CustomerContainer)
