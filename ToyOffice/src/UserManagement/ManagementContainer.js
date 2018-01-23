import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
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
    // debugger
    // console.log("click", e.target.innerText);
    this.setState({
      listStatus: "none",
      autocompleteStatus: "none"
    })
    this.props.history.push(`${this.props.match.path}/${e.target.dataset.customertype}`)
    this.refs.searchInput.blur()

  }
  handleChange(e){
    // console.log(e.target.value.length);
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
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state, route) => ({
  // customers: state.kinder.kinders,
  // students: state.kinder.students,
  // user: state.login.user
})


export default connect(mapStateToProps, actions)(ManagementContainer)
