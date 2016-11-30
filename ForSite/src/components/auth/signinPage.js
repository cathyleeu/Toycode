import React, {Component} from 'react'
import Signin from './signin'
import {connect} from 'react-redux'
import {signinUser} from '../../actions'

class SigninPage extends Component{
  // constructor() {
  //
  // }
  render(){
    const {signinUser} = this.props
    return(
      <div className="row">
        <Signin signinUser={signinUser} />
      </div>
    )
  }
}

SigninPage.propTypes = {
  signinUser: React.PropTypes.func.isRequired
}

export default connect(null, {signinUser})(SigninPage)
