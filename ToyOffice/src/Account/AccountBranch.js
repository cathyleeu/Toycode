import React, {PureComponent} from 'react'
import AccountTableTd from './AccountTableTd'


class AccountBranch extends PureComponent {
  constructor(props){
    super(props)
    let { branchModiData, user } = props;
    this.state = {
      code: user.code,
      name: branchModiData.name,
      location: branchModiData.location,
      sub_name: branchModiData.sub_name,
      license: branchModiData.license,
      repr: branchModiData.repr,
      zipNo: branchModiData.zipNo,
      roadAddr: branchModiData.roadAddr,
      detailAddr: branchModiData.detailAddr,
      phone: '',
      fax: '',
      readOnly: props.readOnly,
      loaded: false
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.readOnly !== this.props.readOnly){
      this.setState({ readOnly: newProps.readOnly})
    }
    if(newProps.branchModiData !== this.props.branchModiData){
      this.setState({ ...newProps.branchModiData, loaded: true })
    }
  }
  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
    this.props.isModifyingInfo('branch', e.target.name, e.target.value)
  }
  render(){
    let { code, name, location, sub_name, license, repr } = this.state,
    info = [
      { title: '지사코드', ctx: code, name0:'code', sub1: '지사 명', subCtx1: sub_name, name1:'sub_name', sub2: '지사 구분', subCtx2: location, name2:'location' },
      { title: '상호명', ctx: name, name0:'name', sub1: '사업자 번호', subCtx1: license, name1:'license', sub2: '대표 명', subCtx2: repr, name2:'repr' }
    ]
    if(!this.state.loaded){
      return <div>로딩중</div>
    }
    return(
      <table className="Account-table">
        {info.map(
          (info, i) =>
            <tbody key={i}>
              <tr className="Account-colSpan">
                <th colSpan="1">{info.title}</th>
                <AccountTableTd
                  colSpan="3"
                  value={info.ctx}
                  onChange={this.handleChange}
                  name={info.name0}
                  readOnly={info.name0 === 'code' ? true : this.state.readOnly}/>
              </tr>
              <tr className="Account-nonColSpan">
                <th>{info.sub1}</th>
                <AccountTableTd
                  value={info.subCtx1}
                  name={info.name1}
                  onChange={this.handleChange}
                  readOnly={this.state.readOnly}/>
                <th>{info.sub2}</th>
                <AccountTableTd
                  value={info.subCtx2}
                  name={info.name2}
                  onChange={this.handleChange}
                  readOnly={this.state.readOnly}/>
              </tr>
            </tbody>
        )}
        <tbody>
          <tr className="Account-colSpan">
            <th colSpan="1">주소</th>
            <AccountTableTd
              value={this.state.zipNo}
              onChange={this.handleChange}
              name='zipNo'
              readOnly={this.state.readOnly}/>
            <AccountTableTd
              value={this.state.roadAddr}
              onChange={this.handleChange}
              name='roadAddr'
              readOnly={this.state.readOnly}/>
            <AccountTableTd
              value={this.state.detailAddr}
              onChange={this.handleChange}
              name='detailAddr'
              readOnly={this.state.readOnly}/>
          </tr>
          <tr className="Account-colSpan">
            <th>전화번호</th>
            <AccountTableTd
              value={this.state.phone}
              name='phone'
              onChange={this.handleChange}
              readOnly={this.state.readOnly}/>
            <th>팩스번호</th>
            <AccountTableTd
              value={this.state.fax}
              name='fax'
              onChange={this.handleChange}
              readOnly={this.state.readOnly}/>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default AccountBranch
