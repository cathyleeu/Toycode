import React, {PureComponent} from 'react'
import {connect} from 'react-redux'


class AccountContainer extends PureComponent {
  state = {
    loaded : false
  }
  componentWillReceiveProps(newProps){
    if(newProps.user !== this.props.user){
      this.setState({loaded: true})
    }
  }
  render(){
    if(this.state.loaded){
      let { user } = this.props, { branch } = user,
          info = [
            { title: '지사 코드', ctx: user.code },
            { title: '지사 명', ctx: branch.name },
            { title: '지사 대표', ctx: branch.repr },
            { title: '지사 구분', ctx: branch.location },
            { title: '사업자 번호', ctx: branch.license },
          ]
      return(
        <div className="Child-Cont">
          <div>
            <table>
              <tbody>
                {info.map(
                  (info, i) =>
                    <tr key={i}>
                      <th>{info.title}</th>
                      <td>{info.ctx}</td>
                    </tr> )}
              </tbody>
            </table>
          </div>
          <div>회계 담당자</div>
          <div>교육 담당자</div>
        </div>
      )
    }
    return(
      <div>
        로딩중
      </div>
    )
  }
}

const mapStateToProps = ({login}) => ({
  user : login.user
})


export default connect(mapStateToProps, null)(AccountContainer)
