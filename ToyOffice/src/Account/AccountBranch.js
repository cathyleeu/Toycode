import React, {PureComponent} from 'react'
import AccountTableTd from './AccountTableTd'


class AccountBranch extends PureComponent {
  render(){
    let { user } = this.props, { branch } = user,
    info = [
      { title: '지사코드', ctx: user.code, sub1: '지사 명', subCtx1: branch.name, sub2: '지사 구분', subCtx2: branch.location },
      { title: '상호명', ctx: branch.name, sub1: '사업자 번호', subCtx1: branch.license, sub2: '대표 명', subCtx2: branch.repr },
      { title: '주소', ctx: "", sub1: '전화번호', subCtx1: branch.license, sub2: '팩스번호', subCtx2: branch.repr },
    ]
    return(
      <table className="Account-table">
        {info.map(
          (info, i) =>
            <tbody key={i}>
              <tr className="Account-colSpan">
                <th colSpan="1">{info.title}</th>
                <AccountTableTd colSpan="3" value={info.ctx} readOnly={this.props.readOnly}/>
              </tr>
              <tr className="Account-nonColSpan">
                <th>{info.sub1}</th>
                <AccountTableTd value={info.subCtx1} readOnly={this.props.readOnly}/>
                <th>{info.sub2}</th>
                <AccountTableTd value={info.subCtx2} readOnly={this.props.readOnly}/>
              </tr>
            </tbody>
        )}
      </table>
    )
  }
}

export default AccountBranch
