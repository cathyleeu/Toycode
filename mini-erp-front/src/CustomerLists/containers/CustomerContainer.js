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
      searchTag: 'All',
      allUsers: this.props.allUsers,
      allKCNames: this.props.allKCNames,
      userloaded: false
    }
  }
  componentDidMount(){
    this.props.fetchAllUserInfo()
    this.props.fetchAllKClassNames()
  }
  componentWillReceiveProps(newProps){
    if(newProps.allUsers !== this.props.allUsers){
      this.setState({allUsers: newProps.allUsers, userloaded: true})
    }
    if(newProps.allKCNames !== this.props.allKCNames){
      this.setState({allKCNames: newProps.allKCNames })
    }
  }
  isSearching = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  isGetTags = (tag) => {
    this.setState({searchTag: tag})
  }
  render(){
    let { status } = this.props, {allUsers, allKCNames, userloaded } = this.state,
        searchString = this.state.searchString.trim().toLowerCase(),
        searchTag = this.state.searchTag;
    const tags = [
      {type:"All", title:"전체", css:'button-edit'},
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
        {allKCNames.length > 0 && (
          <AllUserLists
            status={status}
            allKCNames={allKCNames}
            allUsers={allUsers}
            userloaded={userloaded}
            isUpdateByAdmin={this.props.isUpdateByAdmin}
            fetchInfoForIssued={this.props.fetchInfoForIssued}
            listTitle={tags.find(l => l.type === searchTag).title}/>
        )}
      </div>
    )
  }
}



function mapStateToProps(state, ownProps){
  return {
    allUsers: state.cstList.allUsers,
    allKCNames: state.cstList.allKCNames,
    status: state.cstList,
  }
}


export default connect(mapStateToProps,actions)(CustomerContainer)
