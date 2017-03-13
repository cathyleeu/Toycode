import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { AllUserIVes } from '../components'


class AllIVesContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchString: ''
    }
  }
  componentWillMount(){
    this.props.fetchAllUserIVes()
  }
  isSearching = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    let {allIVes} = this.props,
        searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0){
      allIVes = allIVes.filter(l => (
           l.invoiceId.toLowerCase().match(searchString)
        || l.userName.toLowerCase().match(searchString)
        || l.userCode.toLowerCase().match(searchString)
      ));
    }
    return(
      <div className="has-Header Container">
        <input
          name="searchString"
          className="search_bar"
          type="text" value={this.state.searchString} onChange={this.isSearching} placeholder="지사명, 지사코드 또는 송장번호를 검색하세요."/>
        <AllUserIVes allIVes={allIVes}/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    allIVes: state.cstIVes.allIVes
  }
}

export default connect(mapStateToProps, actions)(AllIVesContainer)
