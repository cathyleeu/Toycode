import React, {PureComponent} from 'react'
import AccountTableTd from './AccountTableTd'


class AccountBranch extends PureComponent {
  constructor(props){
    super(props)
    let { defaultInfo, code } = props;
    // this.isGetInitialState = () => ({
    //   code,
    //   ...defaultInfo,
    //   readOnly: props.readOnly
    // })
    // this.state = this.isGetInitialState()
    this.state = {
      code,
      ...defaultInfo,
      readOnly: props.readOnly
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.defaultInfo !== this.props.defaultInfo) {
      this.setState({
        ...newProps.defaultInfo
      })
    }
    if(newProps.readOnly !== this.props.readOnly){
      this.setState({ readOnly: newProps.readOnly})
    }
  }
  handleChange = (e) => {
    let{ name, value } = e.target;
    this.props.isModifyingInfo('branch', name, value)
  }
  render(){
    let { code, name, location, sub_name, license, repr } = this.state,
    //location = 지사구분 key ex) 강남지사, 평택지사 등 location 으로 구분하여서 key 명이 location
    info = [
      { title: '지사코드', ctx: code, name0:'code', sub1: '지사 명', subCtx1: sub_name, name1:'sub_name', sub2: '지사 구분', subCtx2: location, name2:'location' },
      { title: '상호명', ctx: name, name0:'name', sub1: '사업자 번호', subCtx1: license, name1:'license', sub2: '대표 명', subCtx2: repr, name2:'repr' }
    ]
    return(
      <table className="Account-table">
        {info.map(
          (info, i) =>
            <tbody key={i}>
              <tr className="Account-colSpan">
                <th colSpan="1"><p>{info.title}</p></th>
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
                  readOnly={info.name2 === 'location' ? true : this.state.readOnly}/>
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
