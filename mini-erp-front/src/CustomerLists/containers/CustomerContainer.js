import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './CustomerContainer.css'
import { AllUserLists, SearchAllUser } from '../components'



class CustomerContainer extends Component {
  componentWillMount(){
    this.props.fetchAllUserInfo()
  }
  render(){
    const {allUsers} = this.props
    return(
      <div className="has-Header Container">
        <SearchAllUser />
        <AllUserLists allUsers={allUsers}/>
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
