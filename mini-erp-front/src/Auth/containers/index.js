import React from 'react'
// import SignInAndUp from '../components/SignInAndUp'
import './index.css'
import SignIn from '../components/SignIn'

const AuthContainer = () => {
  let style = {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        overflow: 'scroll'
      }
  return(
  <div className="Auth-Container" style={style}>
    <SignIn />
    {/* <SignInAndUp /> */}
  </div>
)}

export default AuthContainer
