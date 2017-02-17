import React from 'react'
import AllUsersDetail from './AllUsersDetail'

const AllUserLists = ({allUsers}) => (
  <div>
    <h5>고객리스트</h5>
    { allUsers.map(
      (user , i) => (
          <div key={i} className="cst-container">
            <AllUsersDetail user={user}>
              <div>
                <div className="User-Addr">
                  <p>지사 주소 : {user.branch.address.zipNo} | {user.branch.address.roadAddr} | {user.branch.address.detailAddr}</p>
                </div>
                <div className="User-Edu-Manager">
                  <p>교육 담당자 : {user.education.Manager} | {user.education.Phone} | {user.education.Email}</p>
                </div>
                <div className="User-Acct-Manager">
                  <p>회계 담당자 : {user.account.Manager} | {user.account.Phone} | {user.account.Email}</p>
                </div>
                {user.kinders.map((kinder, i) => (
                  <div className="User-Kinders" key={i}>
                    <div className="User-Kinder-Info">
                      <p>유치원 명: {kinder.name} | {kinder.phone}</p>
                      <p>유치원 담당자 : {kinder.manager} | {kinder.managerPh}</p>
                    </div>
                    <div className="Uesr-Kinder-Addr">
                      <p>유치원 주소 : {kinder.zipNo} | {kinder.roadAddr} | {kinder.detailAddr}</p>
                    </div>
                    <div className="User-Kinder-Classes">
                      {kinder.kinderClasses.map((kinderClass, i) => (
                        <div className="User-Kinder-Class" key={i}>
                          <p>{kinderClass.className} | {kinderClass.students}명</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AllUsersDetail>
          </div>
        )
      )
    }
  </div>
)

export default AllUserLists
