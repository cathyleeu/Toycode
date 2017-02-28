import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './Auth/actions'
import Header from './Header'


class App extends Component {
  render() {
    const {auth, signoutUser} = this.props
    return (
      <div>
        <Header auth={auth} userType={auth.user.userType} signoutUser={signoutUser} customerType={auth.user.customerType}/>
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(App)
