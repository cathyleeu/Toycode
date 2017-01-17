import React from 'react'
import Signin from '../components/Signin'
import './index.css'
import logo from '../../../public/logo.png'

const AuthContainer = () => (
  <div className="Auth-Container">
    <div className="Form-Container">
      <img src={logo} className="Auth-logo"/>
      <Signin />
    </div>
  </div>
)

export default AuthContainer
