import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import './CustomerContainer.css'
import { AllUserLists, SearchTags } from '../components'


class CustomerContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchString: '',
      searchTag: 'All'
    }
  }
  componentWillMount(){
    this.props.fetchAllUserInfo()
  }
  isSearching = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  isGetTags = (tag) => {
    this.setState({searchTag: tag})
  }
  render(){
    let { allUsers } = this.props,
        searchString = this.state.searchString.trim().toLowerCase(),
        searchTag = this.state.searchTag;
    const tags = [
      {type:"All", title:"All", css:'button-edit'},
      {type:"A", title:"지사", css:'button-addClass'},
      {type:"B", title:"ECC", css:'button-addClass'},
      {type:"C", title:"YBM영업", css:'button-addClass'},
      {type:"D", title:"PSA", css:'button-addClass'},
      {type:"E", title:"직영원", css:'button-addClass'},
    ]
    if(searchString.length > 0){
        allUsers = allUsers.filter(l => l.branch.name.toLowerCase().match(searchString)
          || l.code.toLowerCase().match(searchString)
          || l.email.toLowerCase().match(searchString)
      );
    }
    if(searchTag !== 'All'){
      allUsers = allUsers.filter(l => l.customerType.match(searchTag))
    }
    return(
      <div className="has-Header Container">
        <div className="User-Top">
          <input
            name="searchString"
            className="search_bar"
            type="text" value={this.state.searchString} onChange={this.isSearching} placeholder="지사명을 검색"/>
          {tags.map(tag => (
            <SearchTags tag={tag} isGetTags={this.isGetTags} key={tag.type} cssName={tag.css}/>
          ))}
        </div>
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
