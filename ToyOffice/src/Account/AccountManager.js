import React, {PureComponent} from 'react'
import { ToyCodeInputCont } from '../Components'


class AccountManager extends PureComponent {
  constructor(props){
    super(props)
    let { defaultInfo } = props;
    // this.isGetInitialState = () => ({
    //   ...defaultInfo,
    // })
    // this.state = this.isGetInitialState()
    this.state = {
      ...defaultInfo
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(newProps){
    if(newProps.defaultInfo !== this.props.defaultInfo) {
      this.setState({
        ...newProps.defaultInfo
      })
    }
  }
  handleChange(e){
    let { name, value } = e.target;
    // this.setState({[e.target.name]:e.target.value})
    this.props.isModifyingInfo('manager', name, value)
  }
  render(){
    let { A_phone, A_manager, A_email, E_phone, E_manager, E_email } = this.state;
    return(
      <form className="AccountManager-Cont">
          <div>
            <h3>회계 담당자</h3>
            <ToyCodeInputCont
              holder="담당자 명"
              styleType="top_aligned"
              name="A_manager"
              value={A_manager}
              handleChange={this.handleChange}
              readOnly={this.props.readOnly}
             />
            <ToyCodeInputCont
              holder="전화번호"
              styleType="top_aligned"
              name="A_phone"
              value={A_phone}
              handleChange={this.handleChange}
              readOnly={this.props.readOnly}
             />
            <ToyCodeInputCont
               holder="이메일"
               styleType="top_aligned"
               name="A_email"
               value={A_email}
               handleChange={this.handleChange}
               readOnly={this.props.readOnly}
              />
          </div>
          <div>
            <h3>교육 담당자</h3>
            <ToyCodeInputCont
              holder="담당자 명"
              styleType="top_aligned"
              name="E_manager"
              value={E_manager}
              handleChange={this.handleChange}
              readOnly={this.props.readOnly}
             />
            <ToyCodeInputCont
              holder="전화번호"
              styleType="top_aligned"
              name="E_phone"
              value={E_phone}
              handleChange={this.handleChange}
              readOnly={this.props.readOnly}
             />
            <ToyCodeInputCont
               holder="이메일"
               styleType="top_aligned"
               name="E_email"
               value={E_email}
               handleChange={this.handleChange}
               readOnly={this.props.readOnly}
              />
          </div>
      </form>
    )
  }
}

export default AccountManager
