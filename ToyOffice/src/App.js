import React, { Component } from 'react';
// import logo from './logo.svg';
import { Drawer, MenuItem } from 'material-ui';
import * as actions from './Login/actions'
import {connect} from 'react-redux'
import { AppBar } from 'material-ui';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Feature from './Feature'
// import { Shop } from './Shop'
// import { OrderDetail } from './OrderDetail'
import { Account } from './Account'
import { Management } from './UserManagement'
import { SettingAcademy, SettingAcademyClass, SettingStudent, StudentDashboard } from './SettingAcademy'



// const OrderList = (props) => <div>OrderList 어드민 페이지 </div>
// const CustomList = (props) => <div>CustomList 어드민 페이지 </div>
// const GoodsList = (props) => <div>GoodsList 어드민 페이지 </div>
// const Statement = (props) => <div>Statement 어드민 페이지 </div>
// const SettingClass = (props) => <div>SettingClass 어드민 페이지 </div>

class App extends Component {
  state = {
    drawerOpen: false,
    header: "토이코드 오피스 사이트"
  }
  componentDidMount(){
    window.addEventListener("load", this.handleLoad.bind(this));
  }
  handleLoad() {
    let headerNameLists = [
      { path:'settingStudent', name : '학생 설정하기' },
      { path:'studentDashboard', name : '학생 리포트' },
      { path:'settingAcademy', name : '소속 학원 설정하기' },
      { path:'settingClass', name : '반 설정하기' },
      { path:'management', name : '회원관리' },
      { path:'', name : '토이코드 오피스 사이트' }
    ]
    let header = headerNameLists.find(l => this.props.location.pathname.includes(l.path)).name

    this.setState({ header })

  }
  handleToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }
  handleLink = (match, path, name) => {
    // 각 페이지에 들어갈때 필요한 데이터 각 불러오도록 해야 할 듯
    this.setState({drawerOpen: !this.state.drawerOpen, header: name})
    // console.log("handleLink",`${match.url}/${path}`);
    this.props.history.replace(`${match.url}/${path}`, {customerType: this.props.user.customerType})
  }
  handleLogOut = (history) => {
    this.setState({drawerOpen: !this.state.drawerOpen})
    this.props.tempoLogOut(history)
  }
  render() {
    const { match, user } = this.props;

    let nav = [
      { path:'settingStudent', component: SettingStudent, name : '학생 설정하기' },
      { path:'studentDashboard', component: StudentDashboard, name : '학생 리포트' },
    ]

    let commonPage = [
      {path:'settingAcademy', component: SettingAcademy, name : '소속 학원 설정하기'},
      {path:'settingClass', component: SettingAcademyClass, name : '반 설정하기'}
    ]

    // userType 에 따라서 drawer list 변경
    let menu = {
      "A" : [{path:'account', component: Account, name : '마이페이지'}].concat(commonPage),
      "B" : commonPage,
      "C" : commonPage,
      "D" : commonPage,
      "E" : commonPage,
      "T" : commonPage,
      "Z" : [{path:'management', component: Management, name : '회원관리'}]
    }

    nav = nav.concat(menu[user.customerType])
    return (
      <div>
        <AppBar
          title={this.state.header}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Switch>
          {nav.map((n, i) =>
            {
              if(n.path === 'settingStudent') {
                return <Route key={i} path={`${match.url}/${n.path}/:id`} component={n.component} />
              }
                return <Route key={i} path={`${match.url}/${n.path}`} component={n.component} />
            }
          )}
          <Route exact path={match.url} component={Feature}/>
        </Switch>
        <Drawer open={this.state.drawerOpen}>
          {menu[user.customerType].map(
            (n, i) => (
              <MenuItem
                key={i}
                onTouchTap={() => this.handleLink(match, n.path, n.name)}
              >
                {n.name}
              </MenuItem>
            )
          )}
          <MenuItem onTouchTap={() => this.handleLogOut(this.props.history)}>로그아웃</MenuItem>
        </Drawer>
      </div>
    );
  }
  componentWillUnmount(){
    window.removeEventListener("load", this.handleLoad.bind(this));
  }
}

const mapStateToProps = (state, second) => ({
  user: state.login.user
})

export default connect(mapStateToProps, actions)(App);
