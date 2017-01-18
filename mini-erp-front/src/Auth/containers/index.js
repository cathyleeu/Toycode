import React from 'react'
import SignInAndUp from '../components/SignInAndUp'
import './index.css'


const AuthContainer = () => {
  let style = {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`
      }
  return(
  <div className="Auth-Container" style={style}>
    <SignInAndUp />
  </div>
)}

export default AuthContainer
