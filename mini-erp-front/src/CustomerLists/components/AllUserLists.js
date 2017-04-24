import React from 'react'
import AllUsersDetail from './AllUsersDetail'
import './AllUserLists.css'
import AllUserKinders from './AllUserKinders'


class AllUserLists extends React.PureComponent {
  state = {
    allUsers: this.props.allUsers,
    allKCNames: this.props.allKCNames,
    userloaded: this.props.userloaded
  }
  componentWillReceiveProps(newProps){
    if(newProps.userloaded !== this.props.userloaded){
      this.setState({userloaded: newProps.userloaded })
    }
  }
  renderKinderInfo = (kinder, i) => {
    let {allKCNames} = this.state;
    return <AllUserKinders kinder={kinder} key={i} allKCNames={allKCNames}/>
  }
  render(){
    let {allUsers, listTitle, isUpdateByAdmin} = this.props;
    if(!this.state.userloaded){
      return <div> 유저 로딩 중 </div>
    } else {
      return(
        <div>
          <h5>{listTitle}리스트</h5>
          {allUsers.map((user, i) => (
            <AllUsersDetail user={user} isUpdateByAdmin={isUpdateByAdmin} key={i}>
              <div>
                <div>
                  <p>사업자 번호 : {user.branch.license} | 지사 명칭: {user.branch.sub_name}</p>
                </div>
                <div className="User-Edu-Manager">
                  <p>교육 담당자 : {user.education.E_manager} | {user.education.E_phone} | {user.education.E_email}</p>
                </div>
                <div className="User-Acct-Manager">
                  <p>회계 담당자 : {user.account.A_manager} | {user.account.A_phone} | {user.account.A_email}</p>
                </div>
                {user.kinders.map(this.renderKinderInfo)}
              </div>
            </AllUsersDetail>
          )) }
        </div>
      )
    }
  }
}


export default AllUserLists
