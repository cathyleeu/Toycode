import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import AccountBranch from './AccountBranch'
import AccountManager from './AccountManager'
import Perf from 'react-addons-perf'
import './index.css'
import { ConditionalHeader, BodyContainer } from '../Components'

class AccountContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      loaded : false,
      branchModi: false,
      mngModi: false,
    }
    this.handleModiToggle = this.handleModiToggle.bind(this)
  }

  componentWillMount(){
    window.performance.mark('AccountContainer')
  }
  componentDidMount(){
    console.log(window.performance.now('AccountContainer'))
  }
  componentDidUpdate() {
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
  }
  componentWillReceiveProps(newProps){
    if(newProps.branchModi !== this.props.branchModi){
      this.setState({loaded: true})
    }
  }
  handleModiToggle(e){
    let { name, purpose, api } = e.target.dataset,
        textContent = e.target.textContent;
    if(confirm(`${textContent} 하시겠습니까?`)){
      if(purpose === "complete"){
        this.props.isCompoleteModi(api, this.props[name])
      }
      if(purpose === "cancle") {
        this.props.isDefalutModi(this.props.user)
      }
    } else {
      // this.props.isDefalutModi(this.props.user)
      return false
    }
    this.setState({
      [name]: !this.state[name]
    })

  }
  renderAccountTable = (account , i) => {
    let { Component } = account;
    return(
    <div key={i} style={{"width": "90%", "maxWidth": "800px"}}>
      <ConditionalHeader
        headerStyle="Account-table-top"
        headerTitle={account.title}
        flipStatus={this.state[account.type]}
        btnFront={
          [
            {purpose: "edit", name: "수정", dataName: account.type, dataApi: account.api}
          ]
        }
        btnBack={
          [
            {purpose: "complete", name: "완료", dataName: account.type, dataApi: account.api},
            {purpose: "cancle", name: "취소", dataName: account.type, dataApi: account.api}
          ]
        }
        onClick={this.handleModiToggle}
      />
      <Component
        isModifyingInfo={this.props.isModifyingInfo}
        defaultInfo={this.props[account.type]}
        code={this.props.user.code}
        readOnly={!this.state[account.type]}/>
    </div>
  )}
  render(){
    const AccountTableList = [
      {
        title:"지사정보",
        type: "branchModi",
        api: "branch",
        Component: AccountBranch
      },
      {
        title:"담당자 정보",
        type: "mngModi",
        api: "manager",
        Component: AccountManager
      }
    ];

    if(!this.state.loaded){
      return(
        <BodyContainer>
          로딩중
        </BodyContainer>
      )
    }
    return(
      <BodyContainer>
        {AccountTableList.map(this.renderAccountTable)}
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.login.user,
  branchModi: state.account.branch,
  mngModi: state.account.manager
})


export default connect(mapStateToProps, actions)(AccountContainer)
