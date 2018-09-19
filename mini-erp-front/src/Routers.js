import React, {Component} from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import requireAuth from './services/require_auth'
import * as actions from './Auth/actions'
import App from './App'
import { Shop } from './Shop'
import { Auth } from './Auth'
import { UserAccount } from './UserAccount'
import { AllIVes } from './CustomerInvoices'
import { CustomerLists } from './CustomerLists'
import { Catalog } from './Catalog'
import { Statement } from './Statement'
import { Transport } from './TransportGoods'
import { Return } from './ReturnGoods'
import { IssuedLogin, Reports } from './IssuedLogin'
import Feature from './Feature'
import SignUp from './Auth/containers/SignUp'


class Routers extends Component {
  constructor() {
    super()
    this.state = {
      status : false
    }
  }
  componentDidMount(){
    this.props.fetchUserInfo()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.completed !== nextProps.completed) {
      this.setState({
        status : nextProps.completed
      })
    }
    console.log("Routers componentWillReceiveProps");

  }
  requireLogin = (nextState, replace) => {
    const token = localStorage.getItem('token')
    if (!token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  render(){
    const { auth } = this.props;
    if(!this.state.status) {
      return false
    }
     return(
      <Router history={browserHistory}>
        <Route path='reports' component={Reports}/>
          <Route path='/' component={App} auth={auth}>
            <IndexRoute component={Feature} onEnter={this.requireLogin}/>
            <Route path="login" component={Auth} />
            <Route path="logout" component={Auth} />
            <Route path="signup" component={SignUp} />
            <Route path='feature' component={requireAuth(Feature)}/>
            <Route path='shop' component={requireAuth(Shop)}/>
            <Route path='issued' component={requireAuth(IssuedLogin)}/>
            <Route path='account' component={requireAuth(UserAccount)}/>
            <Route path='allIves' component={requireAuth(AllIVes)}/>
            <Route path='cst-list' component={requireAuth(CustomerLists)}/>
            <Route path="catalog" component={requireAuth(Catalog)} />
            <Route path="statement" component={requireAuth(Statement)} />
            <Route path="transport" component={requireAuth(Transport)} />
            <Route path="return" component={requireAuth(Return)} />
          </Route>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    completed: state.auth.completed
  }
}

export default connect(mapStateToProps, actions)(Routers)
