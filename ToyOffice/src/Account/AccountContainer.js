import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import AccountBranch from './AccountBranch'
import AccountManager from './AccountManager'
import AccountTableHeader from './AccountTableHeader'
import './index.css'

class AccountContainer extends PureComponent {
  state = {
    loaded : false,
    branchModi: false,
    mngModi: false,
  }
  componentWillMount(){
    if(this.props.user.code){
      this.setState({loaded: true})
      this.props.isDefalutModi(this.props.user)
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.user !== this.props.user){
      this.props.isDefalutModi(newProps.user)
      this.setState({loaded: true})
    }
  }
  handleModiTrue = (name) => {
    this.setState({[name]: true})
    this.props.isDefalutModi(this.props.user)
  }
  handleModiFalse = (name) => {
    this.setState({[name]: false})
    if(confirm('수정을 완료하시겠습니까?')){
      this.props.isCompoleteModi(name, this.props.branchModiData)
    } else {
      this.props.isDefalutModi(this.props.user)
    }
  }
  render(){
    if(this.state.loaded){
      return(
        <div className="Child-Cont Account">
          <div>
            <AccountTableHeader
              title="지사정보"
              onClickTrue={() => this.handleModiTrue('branchModi')}
              onClickFalse={() => this.handleModiFalse('branchModi')}
              modi={!this.state.branchModi}/>
            <AccountBranch {...this.props} readOnly={!this.state.branchModi}/>
          </div>
          <div>
            <AccountTableHeader
              title="담당자 정보"
              onClickTrue={() => this.handleModiTrue('mngModi')}
              onClickFalse={() => this.handleModiFalse('mngModi')}
              modi={!this.state.mngModi} />
            <AccountManager readOnly={!this.state.mngModi}/>
          </div>
        </div>
      )
    }
    return(
      <div>
        로딩중
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.login.user,
  branchModiData: state.account.branch,
  mangerModiData: state.account.manager
})


export default connect(mapStateToProps, actions)(AccountContainer)
