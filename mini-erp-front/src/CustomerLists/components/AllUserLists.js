import React from 'react'
import AllUsersDetail from './AllUsersDetail'
import './AllUserLists.css'


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
                  <p>교육 담당자 : {user.education.E_manager} | {user.education.E_phone} | {user.education.E_email}</p>
                </div>
                <div className="User-Acct-Manager">
                  <p>회계 담당자 : {user.account.A_manager} | {user.account.A_phone} | {user.account.A_email}</p>
                </div>
                {user.kinders.map((kinder, i) => (
                  <div className="User-Kinders" key={i}>
                    <div className="User-Kinder-Info">
                      <p>유치원 명: {kinder.name} | {kinder.phone} | <strong>접속주소코드 <a href={`https://toycode.org/code/${kinder.url}`} target="_blank">toycode.org/code/{kinder.url}</a></strong></p>
                      <p>유치원 담당자 : {kinder.manager} | {kinder.managerPh}</p>
                    </div>
                    <div className="Uesr-Kinder-Addr">
                      <p>유치원 주소 : {kinder.zipNo} | {kinder.roadAddr} | {kinder.detailAddr}</p>
                    </div>
                    <div className="User-Kinder-Classes">
                      {kinder.kinderClasses.map((kinderClass, i) => (
                        <div className="User-Kinder-Class" key={i}>
                          <p>{kinderClass.className} | {kinderClass.level}</p>
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
