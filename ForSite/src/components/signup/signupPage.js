import React, {Component} from 'react'
import SignupForm from './signupForm'
import {connect} from 'react-redux'
import {signupUser} from '../../actions'

class SignupPage extends Component{
  // constructor() {
  //
  // }
  render(){
    const {signupUser} = this.props
    return(
      <div className="row">
        <SignupForm signupUser={signupUser} />
      </div>
    )
  }
}

SignupPage.propTypes = {
  signupUser: React.PropTypes.func.isRequired
}

export default connect(null, {signupUser})(SignupPage)
