import React, { Component } from 'react';


import Header from './header'
import SigninPage from './auth/signinPage'



export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
