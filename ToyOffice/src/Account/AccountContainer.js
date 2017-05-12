import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
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
  componentWillReceiveProps(newProps){
    console.log("componentWillReceiveProps")
    if(newProps.user !== this.props.user){
      this.setState({loaded: true})
    }
  }
  handleModiTrue = (name) => {
    this.setState({[name]: true})
  }
  handleModiFalse = (name) => {
    this.setState({[name]: false})
  }
  render(){
    if(this.state.loaded){
      console.log(this.state)
      return(
        <div className="Child-Cont">
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

const mapStateToProps = ({login}) => ({
  user : login.user
})


export default connect(mapStateToProps, null)(AccountContainer)
