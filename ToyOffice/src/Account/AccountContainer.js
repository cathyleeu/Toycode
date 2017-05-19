import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import AccountBranch from './AccountBranch'
import AccountManager from './AccountManager'
import AccountTableHeader from './AccountTableHeader'
import Perf from 'react-addons-perf'
import './index.css'

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
  handleModiToggle(name, btn){
    // Perf.start()
    if(this.state[name]){
      if(btn === "완료"){
        if(confirm('수정을 완료하시겠습니까?')){
          this.props.isCompoleteModi(name, this.props[name])
        } else {
          this.props.isDefalutModi(this.props.user)
        }
      } else {
        if(confirm('취소 하시겠습니까?')){
          this.setState(prevState => ({[name]: !prevState[name]}))
          this.props.isDefalutModi(this.props.user)
        }
      }
    } else {
      this.setState(prevState => ({[name]: !prevState[name]}))
    }
    this.props.isDefalutModi(this.props.user)
  }
  render(){
    if(this.state.loaded){
      return(
        <div className="Child-Cont Account">
          <div>
            <AccountTableHeader
              title="지사정보"
              typeOf="branchModi"
              onClick={this.handleModiToggle}
              modi={!this.state.branchModi}/>
            <AccountBranch {...this.props} readOnly={!this.state.branchModi}/>
          </div>
          <div>
            <AccountTableHeader
              title="담당자 정보"
              typeOf="mngModi"
              onClick={this.handleModiToggle}
              modi={!this.state.mngModi} />
            <AccountManager {...this.props} readOnly={!this.state.mngModi}/>
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
  branchModi: state.account.branch,
  mngModi: state.account.manager
})


export default connect(mapStateToProps, actions)(AccountContainer)
