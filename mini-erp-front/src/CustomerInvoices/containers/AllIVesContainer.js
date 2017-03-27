import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { AllUserIVes, SearchTags } from '../components'

class Config extends Component {
  render(){
    return(
      <div>
        <select id="pageSize" value={this.props.pageSize} onChange={this.props.handlePageSizeChange} className='num-config'>
          <option value="5">5개 보기</option>
          <option value="10">10개 보기</option>
          <option value="20">20개 보기</option>
        </select>
      </div>
    )
  }
}

class AllIVesContainer extends Component {
  constructor(){
    super()
    this.state = {
      searchString: '',
      searchTag: 'All',
      pageSize: 10
    }
  }
  componentDidMount(){
    this.props.fetchAllUserIVes()
  }
  handlePageSizeChange = (e) => {
    this.setState({pageSize: Number(e.target.value)})
  }
  isSearching = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  isGetTags = (tag) => {
    this.setState({searchTag: tag})
  }
  render(){
    let {allIVes} = this.props,
        searchString = this.state.searchString.trim().toLowerCase(),
        searchTag = this.state.searchTag;
    if(searchString.length > 0){
      allIVes = allIVes.filter(l => (
           l.invoiceId.toLowerCase().match(searchString)
        || l.userName.toLowerCase().match(searchString)
        || l.userCode.toLowerCase().match(searchString)
      ));
    }
    const tags = [
      {type:"All", title:"전체", css:'button-edit'},
      {type:"A", title:"지사", css:'button-addClass'},
      {type:"B", title:"ECC", css:'button-addClass'},
      {type:"C", title:"YBM영업", css:'button-addClass'},
      {type:"D", title:"PSA", css:'button-addClass'},
      {type:"E", title:"직영원", css:'button-addClass'},
    ]
    if(searchTag !== 'All'){
      allIVes = allIVes.filter(l => l.userCode.slice(0,1).match(searchTag))
    }
    return(
      <div className="has-Header Container">
        <div className="User-Top">
          <input
            name="searchString"
            className="search_bar"
            type="text" value={this.state.searchString} onChange={this.isSearching} placeholder="지사명, 지사코드 또는 송장번호를 검색하세요."/>
          {tags.map(tag => (
            <SearchTags tag={tag} isGetTags={this.isGetTags} key={tag.type} cssName={tag.css}/>
          ))}
        </div>
        <div className='num-config-cont'>
          <h5>{tags.find(l => l.type === searchTag).title} 고객 주문 상황</h5>
          <Config pageSize={this.state.pageSize} handlePageSizeChange={this.handlePageSizeChange}/>
        </div>
        <AllUserIVes allIVes={allIVes} pageSize={this.state.pageSize}/>
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
