import React from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import requireAuth from './services/require_auth'
import App from './App'
import { Shop } from './Shop'
import { Auth } from './Auth'
import { UserAccount } from './UserAccount'
import Feature from './Feature'


const Routers = ({auth}) => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      { auth.authenticated ? <IndexRoute component={Feature}/> : <IndexRoute component={Auth}/> }
      <Route path='feature' component={requireAuth(Feature)}/>
      <Route path='shop' component={requireAuth(Shop)}/>
      <Route path='account' component={requireAuth(UserAccount)}/>
    </Route>
  </Router>
)


function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Routers)