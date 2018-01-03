import React from 'react'


const logo = require('../../public/logo.png');

const LoginTemp = ({
  displayStatus,
  subHeader,
  children
}) => (
  <div style={{ display: displayStatus }}>
    <div className="Login-logo-cont">
      <img src={logo} className="Login-logo" alt="logo" />
    </div>
    {subHeader ? <h4>{subHeader}</h4> : false}
    {children}
  </div>
)

export default LoginTemp
