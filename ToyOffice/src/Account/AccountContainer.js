import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import AccountBranch from './AccountBranch'
import AccountManager from './AccountManager'
// import AccountTableHeader from './AccountTableHeader'
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
    if(this.props.user.code){
      this.setState({loaded: true})
      this.props.isDefalutModi(this.props.user)
    }
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
    if(newProps.user !== this.props.user){
      this.props.isDefalutModi(newProps.user)
      this.setState({loaded: true})
    }
  }
  handleModiToggle(e){
    let { name, result } = e.target.parentElement.parentElement.dataset,
        textContent = e.target.textContent;
    if(confirm(`${textContent} 하시겠습니까?`)){
      if(result === "complete"){
        this.props.isCompoleteModi(name, this.props[name])
      }
    } else {
      this.props.isDefalutModi(this.props.user)
    }
    this.setState({
      [name]: !this.state[name]
    })

  }
  renderAccountTable = (account , i) => {
    let headerType = this.state[account.type] ? "flipped" : "normal"
    return(
    <div key={i} style={{"width": "90%", "maxWidth": "800px"}}>
      <ConditionalHeader
        headerType={headerType}
        headerStyle="Account-table-top"
        name={account.type}
        headerTitle={account.title}
        btnTitle="수정"
        secondary={true}
        onClick={this.handleModiToggle}
      />
      {
        account.type === "branchModi"
          ? <AccountBranch {...this.props} readOnly={!this.state[account.type]}/>
          : <AccountManager {...this.props} readOnly={!this.state[account.type]}/>
      }
    </div>
  )}
  render(){
    const AccountTableList = [
      {
        title:"지사정보",
        type: "branchModi"
      },
      {
        title:"담당자 정보",
        type: "mngModi"
      }
    ];
     if(this.state.loaded){
      return(
        <BodyContainer>
          {AccountTableList.map(this.renderAccountTable)}
        </BodyContainer>
      )
    }
    return(
      <BodyContainer>
        로딩중
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


/* <AccountTableHeader
  title={account.title}
  typeOf={account.type}
  onClick={this.handleModiToggle}
  modi={!this.state[account.type]}/> */



  // debugger
  // Perf.start()
  // if(this.state[name]){
  //   if(btn === "완료"){
  //     if(confirm('수정 하시겠습니까?')){
  //       this.props.isCompoleteModi(name, this.props[name])
  //     } else {
  //       this.props.isDefalutModi(this.props.user)
  //     }
  //   } else {
  //     if(confirm('취소 하시겠습니까?')){
  //       this.setState(prevState => ({[name]: !prevState[name]}))
  //       this.props.isDefalutModi(this.props.user)
  //     }
  //   }
  // } else {
  //
  // }
  //
