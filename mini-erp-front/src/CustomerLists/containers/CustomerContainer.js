import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './CustomerContainer.css'
import { AllUserLists } from '../components'


class CustomerContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchString: ''
    }
  }
  componentWillMount(){
    this.props.fetchAllUserInfo()
  }
  isSearching = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    let {allUsers} = this.props,
        searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0){
      allUsers = allUsers.filter(l => l.branch.name.toLowerCase().match(searchString) || l.code.toLowerCase().match(searchString));
    }
    return(
      <div className="has-Header Container">
        <input
          name="searchString"
          className="search_bar"
          type="text" value={this.state.searchString} onChange={this.isSearching} placeholder="지사명을 검색"/>
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
