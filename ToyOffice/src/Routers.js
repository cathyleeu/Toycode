import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' // withRouter
import App from './App'
import Login from './Login'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'



class Routers extends Component {
  state = {
     login: this.props.login.authenticated
  }
  componentWillReceiveProps(newProps){
    this.setState({login: newProps.login.authenticated})
  }
  render(){
    console.log(this.state.login)
    const RedirectToLogin = (path) => this.state.login ? <Redirect to={`/${path}`}/> : <Redirect to="/login" />
    return(
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={App} auth={this.state.login}/>
          <Route exact path="/" render={() => RedirectToLogin('home')} />
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
  login
})


export default connect(mapStateToProps, null)(Routers)
// export default withRouter(connect(mapStateToProps)(Routers))
