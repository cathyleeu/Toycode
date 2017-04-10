import React from 'react'
import AllUsersDetail from './AllUsersDetail'
import './AllUserLists.css'



// class AllUserLists extends Component {
//   constructor(props) {
//     super(props)
//     this.state={
//       currentPage: 1
//     }
//   }
//   componentWillReceiveProps(nextProps){
//     this.setState({currentPage: 1})
//   }
//   getPage = () => {
//     var start = this.props.pageSize * (this.state.currentPage - 1)
//     var end = start + this.props.pageSize
//     return {
//       currentPage: this.state.currentPage
//     , allUsers: this.props.allUsers.slice(start, end)
//     , numPages: this.getNumPages()
//     , handleClick: function(pageNum) {
//         return function() { this.handlePageChange(pageNum) }.bind(this)
//       }.bind(this)
//     }
//   }
//   getNumPages = () => {
//     var numPages = Math.floor(this.props.allUsers.length / this.props.pageSize)
//     if (this.props.allUsers.length % this.props.pageSize > 0) {
//       numPages++
//     }
//     return numPages
//   }
//   handlePageChange = (pageNum) => {
//     this.setState({currentPage: pageNum})
//   }
//
// }


const AllUserLists = ({allUsers, listTitle}) => (
  <div>
    <h5>{listTitle}리스트</h5>
    { allUsers.map(
      (user , i) => (
          <div key={i} className="cst-container">
            <AllUsersDetail user={user}>
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
                {user.kinders.map((kinder, i) => {
                  return(
                  <div className="User-Kinders" key={i}>
                    <div className="User-Kinder-Info">
                      <p>유치원 명: {kinder.name} | {kinder.phone} | <strong>접속주소코드 <a href={`https://toycode.org/code/${kinder.url}`} target="_blank">toycode.org/code/{kinder.url}</a></strong></p>
                      <p>유치원 담당자 : {kinder.manager} | {kinder.managerPh}</p>
                    </div>
                    <div className="Uesr-Kinder-Addr">
                      <p>유치원 주소 : {kinder.zipNo} | {kinder.roadAddr} | {kinder.detailAddr}</p>
                    </div>
                    <div className="User-Kinder-Classes">
                      {kinder.kinderClasses.map((kdc, i) => {
                        return(
                        <div key={i} >

                          {kdc.className}-{kdc.level}
                        </div>
                      )})}
                    </div>
                  </div>
                )})}
              </div>
            </AllUsersDetail>
          </div>
        )
      )
    }
  </div>
)

export default AllUserLists


/* <form action="https://toycode.org/issue" method="POST" target="_blank">
  <input type="hidden" name="code" value={kinder.url} />
  <input type="hidden" name="school" value={kinder.name} />
  <input type="hidden" name="className" value={kdc.className} />
  <input type="hidden" name="yearmonth" value="201703" />
  <input type="hidden" name="level" value={kdc.level} />
  <input type="hidden" name="students" value={studentsNames[kclassName] ? studentsNames[kclassName].students : ''} />
  <button className='button-edit' type='submit'>{kdc.className}-{kdc.level}</button>
</form> */
