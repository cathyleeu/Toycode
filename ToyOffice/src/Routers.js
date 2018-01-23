import React, {PureComponent} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' // withRouter
import App from './App'
import Login from './Login'
import * as actions from './Login/actions'
// import Register from './Login/Register'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'



class Routers extends PureComponent {
  state = {
     login: this.props.login,
     status: false
  }
  componentWillMount(){
    this.props.getUserInfo()
  }
  componentWillReceiveProps(newProps){
    if(newProps.login !== this.props.login) {
      this.setState({
        login: newProps.login
      })
    }

    if(newProps.user.customerType !== this.props.user.customerType) {
      this.setState({
        status: true
      })
    }
  }
  render(){
    const RedirectToLogin = (path) => this.state.login ? <Redirect to={`/${path}`}/> : <Redirect to="/login" />
    if(this.state.login && !this.state.status) {
      return false
    }
    return(
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={App} auth={this.state.login}/>
          <Route exact path="/" render={() => RedirectToLogin('home')} />
          {/* <Route path="/register" component={Register}/> */}
          <Route path="/login" render={() => (
            this.state.login
              ? <Redirect to="/home" />
              : <Login />
          )}/>
        </Switch>
      </Router>
    )
  }
}



const mapStateToProps = ({login}) => ({
  login: login.authenticated,
  user: login.user,
})


export default connect(mapStateToProps, actions)(Routers)
// export default withRouter(connect(mapStateToProps)(Routers))
