import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'
import { BodyContainer } from '../Components'
import './index.css'



// const filterByTag = (type) => {
//   return <div>{type}</div>
// }

class ManagementContainer extends Component {
  constructor(){
    super()
    this.state = {
      listStatus: "none",
      autocompleteStatus: "none",
      pageState: {
        currentPage: 1,
        pageSize: 10
      },
      filterUser: [],
      search: "",
      autocomplete: [
        {name: "(주)에코에듀", email: "wuyo2757@hanmail.net", code: "A00088"},
        {name: "다원교육", email: "pdk1014@daum.net", code: "A00087"},
        {name: "통큰교육", email: "applekinder@hanmail.net", code: "A00072"},
        {name: "성동ECC", email: "jayou03@hanmail.net", code: "B00163"},
        {name: "ECC석계어학학원", email: "960960@hanmail.net", code: "B00024"},
        {name: "쌍문ECC", email: "rladuddhrr@nate.com", code: "B00032"},
        {name: "키즈월드교육사", email: "win3049@hanmail.net", code: "C00071"},
        {name: "(주)열린브레멘", email: "yn115202@hanmail.net", code: "C000103"},
        {name: "피에스에이분당어학학원", email: "bundangpsa@naver.com", code: "D00093"},
        {name: "PSA용산어학학원", email: "bhjhsj2010@naver.com", code: "D00122"},
        {name: "주식회사 설리번교육", email: "secyin@hotmail.com", code: "E00076"}
      ]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.autocompleteNodes = this.autocompleteNodes.bind(this)
    this.getPager = this.getPager.bind(this)
    this.setPage = this.setPage.bind(this)
  }
  componentWillMount(){
    let { currentPage, pageSize } = this.state.pageState
    this.props.requestPage(pageSize, currentPage)
  }
  componentWillReceiveProps(newProps) {
    if(newProps.filterUser !== this.props.filterUser) {
      let pageState = this.getPager(this.state.pageState.currentPage)
      this.setState({
        filterUser: newProps.filterUser,
        pageState
      })
    }


  }
  handleFocus = () => {
    this.setState({
      listStatus: ""
    })
  }
  handleBlur = (e) => {
    e.preventDefault()
    this.setState({
      listStatus: "none",
      autocompleteStatus: "none"
    })
  }
  handleMouseDown(e){
    e.preventDefault()
    this.setState({
      listStatus: "none",
      autocompleteStatus: "none"
    })
    this.props.history.push(`${this.props.match.path}/${e.target.dataset.customertype}`)
    this.refs.searchInput.blur()

  }
  handleChange(e){
    if(e.target.value.length > 2) {
      this.setState({
        listStatus: "none",
        autocompleteStatus: ""
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  autocompleteNodes(filteredNodes){
    // console.log(filteredNodes);
    return filteredNodes.map((l, i) => (
      <li key={i} onMouseDown={this.handleMouseDown}>
        {/* <a href=""> */}
          {l.name}
        {/* </a> */}
      </li>
    ))
  }
  setPage(page) {
      // var items = this.props.items;
      var pageState = this.state.pageState;

      if (page < 1 || page > pageState.pageRange) {
          return;
      }

      // get new pageState object for specified page
      pageState = this.getPager(page);

      // get new page of items from items array
      this.props.requestPage(10, page)
      // console.log("setPage",pageState);
      // update state
      this.setState({ pageState });

      // call change page function in parent component

  }
  getPager(currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;
      let pageRange = this.props.pageRange
      //total item 을 여기서 정리하나봄...
      // calculate total pages

      var startPage, endPage;
      if (pageRange <= 5) {
          // less than 5 total pages so show all
          startPage = 1;
          endPage = pageRange;
      } else {
          // more than 5 total pages so calculate start and end pages
          if (currentPage <= 3) {
              startPage = 1;
              endPage = 5;
          } else if (currentPage + 2 >= pageRange) {
              startPage = pageRange - 4;
              endPage = pageRange;
          } else {
              startPage = currentPage - 2;
              endPage = currentPage + 2;
          }
      }

      // calculate start and end item indexes

      let pages = [];
      for(let i = startPage; i < endPage + 1; i++ ) {
        pages.push(i)
      }
      // return object with all pager properties required by the view
      return {

          currentPage: currentPage, //현재 클릭 페이지
          pageSize: pageSize, // 현 페이지에 들어가는 데이터 수
          pageRange: pageRange, //전체 페이지 수
          startPage: startPage, // 처음 시작하는 페이지 넘버
          endPage: endPage, // 마지막 페이지 넘버
          pages: pages // 페이저 클릭하는 수
      };
  }
  render(){
    let customerTypeLists = [
      {name: "직영지사", type: "A"},
      {name: "ECC", type: "B"},
      {name: "YBM", type: "C"},
      {name: "PSA", type: "D"},
      {name: "직영원", type: "E"}
    ]
    let filteredNodes = [], searchString = this.state.search;

    if(searchString.length > 2){
        filteredNodes = this.state.autocomplete.filter(l => {
          searchString = searchString.toLowerCase()
        return l.name.toLowerCase().match(searchString)
            || l.code.toLowerCase().match(searchString)
            || l.email.toLowerCase().match(searchString)
      });
    }
    let { pageState } = this.state;
    if(!pageState.pages) {
      return false
    }
    // console.log(pageState);
    return (
      <BodyContainer>
        <input
          ref="searchInput"
          type="search"
          name="search"
          className="search-input"
          value={this.state.search}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="회원명, 이메일, 유저코드"/>
        <Router>
          <div className="search-focus" style={{display: this.state.listStatus}}>
            <p>고객유형으로 검색하기</p>
      			<ul className="drop-list">
              {customerTypeLists.map((l,i) => (
                <li key={i} onMouseDown={this.handleMouseDown} data-customerType={l.type}>
        					{/* <a href=""> */}
                  {/* <Link to={l.type}> */}
      							{l.name}
        					{/* </a> */}
                  {/* </Link> */}
        				</li>
              ))}
      			</ul>
          <Switch>
            <Route path="/:userType" component={BodyContainer}/>
          </Switch>
          </div>
        </Router>
        <div className="search-focus" style={{display: this.state.autocompleteStatus}}>
    			<ul className="autocomplete-list">
            {this.autocompleteNodes(filteredNodes)}
    			</ul>
    		</div>
        <div>
          {this.state.filterUser.map((u, i) => {
            return <div key={i}>{u.email}</div>
          })}
        </div>
        <div>
          <ul className="pagination">
              <li className={pageState.currentPage === 1 ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(1)}>First</a>
              </li>
              <li className={pageState.currentPage === 1 ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pageState.currentPage - 1)}>Previous</a>
              </li>
              {pageState.pages.map((page, index) =>
                  <li key={index} className={pageState.currentPage === page ? 'active' : ''}>
                      <a onClick={() => this.setPage(page)}>{page}</a>
                  </li>
              )}
              <li className={pageState.currentPage === pageState.totalPages ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pageState.currentPage + 1)}>Next</a>
              </li>
              <li className={pageState.currentPage === pageState.totalPages ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pageState.pageRange)}>Last</a>
              </li>
          </ul>
        </div>
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  filterUser: state.management.filterUser,
  pageRange : state.management.pageRange,
  totalSize : state.management.totalSize,
  // customers: state.kinder.kinders,
  // students: state.kinder.students,
  // user: state.login.user
})


export default connect(mapStateToProps, actions)(ManagementContainer)
