import React from 'react'

const AllUserLists = ({allUsers}) => (
  <div>
    <h5>고객리스트</h5>
    { allUsers.map(
      (user , i) => (
          <div key={i} className="cst-container">
            <div className="User-Info">
              <p>{user.branch.Name}</p>
              <p>{user.Code}</p>
              <p>{user.email}</p>
            </div>

            <div className="User-Addr">
              <p>{user.branch.Address.detailAddr}</p>
              <p>{user.branch.Address.roadAddr}</p>
              <p>{user.branch.Address.zipNo}</p>
            </div>
            <div className="User-Edu-Manager">
              <p>{user.education.Manager}</p>
              <p>{user.education.Phone}</p>
              <p>{user.education.Email}</p>
            </div>
            <div className="User-Acct-Manager">
              <p>{user.account.Manager}</p>
              <p>{user.account.Phone}</p>
              <p>{user.account.Email}</p>
            </div>
            {user.kinders.map((kinder, i) => (
              <div className="User-Kinders" key={i}>
                <div className="User-Kinder-Info">
                  <p>{kinder.name}</p>
                  <p>{kinder.phone}</p>
                  <p>{kinder.manager}</p>
                  <p>{kinder.managerPh}</p>
                </div>
                <div className="Uesr-Kinder-Addr">
                  <p>{kinder.zipNo}</p>
                  <p>{kinder.roadAddr}</p>
                  <p>{kinder.detailAddr}</p>
                </div>
                <div className="User-Kinder-Classes">
                  {kinder.kinderClasses.map((kinderClass, i) => (
                    <div className="User-Kinder-Class" key={i}>
                      <p>{kinderClass.className}</p>
                      <p>{kinderClass.students}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )
    }
  </div>
)

export default AllUserLists
