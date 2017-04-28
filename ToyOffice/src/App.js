import React, { Component } from 'react';
// import logo from './logo.svg';
import { Drawer, MenuItem } from 'material-ui';
import * as actions from './Login/actions'
import {connect} from 'react-redux'
import { AppBar } from 'material-ui';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Feature from './Feature'
import { Shop } from './Shop'
import { OrderDetail } from './OrderDetail'
import { Account } from './Account'



const Kinder = (props) => <div>Kinder</div>
const IssueLogin = (props) => <div>IssueLogin</div>


class App extends Component {
  state = {
    drawerOpen: false,
    header: "토이코드 오피스 사이트"
  }
  handleToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }
  handleLink = (match, path, name) => {
    this.setState({drawerOpen: !this.state.drawerOpen, header: name})
    this.props.history.replace(`${match.url}/${path}`)
  }
  handleLogOut = (history) => {
    this.setState({drawerOpen: !this.state.drawerOpen})
    this.props.tempoLogOut(history)
  }
  render() {
    const { match } = this.props;
    let nav = [
      {path:'shop', component: Shop, name: '주문하기'},
      {path:'details', component: OrderDetail, name : '주문내역'},
      {path:'account', component: Account, name : '마이페이지'},
      {path:'kinder', component: Kinder, name : '키즈씽킹 원 설정'},
      {path:'issue', component: IssueLogin, name : '키즈씽킹 로그인 발급'}
    ]
    return (
      <div>
        <AppBar
          title={this.state.header}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Switch>
          {nav.map((n, i) => <Route key={i} path={`${match.url}/${n.path}`} component={n.component}/>)}
          <Route exact path={match.url} component={Feature}/>
        </Switch>
        <Drawer open={this.state.drawerOpen}>
          {nav.map((n, i) => <MenuItem key={i} onTouchTap={() => this.handleLink(match, n.path, n.name)}>{n.name}</MenuItem>)}
          <MenuItem onTouchTap={() => this.handleLogOut(this.props.history)}>로그아웃</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default connect(null, actions)(App);



/*
  RaisedButton: onClick, onTouchTap 사용가능



  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>


  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>

*/
