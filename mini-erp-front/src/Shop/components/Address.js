import React, {Component} from 'react'
import Input from './Input'


class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rqcontent: ''
    }
  }
  handleChange = e => {
    this.setState({rqcontent:e.target.value})
  }
  render(){
    const {user, userEmail, userCode, requestInvoice, selected} = this.props
    // debugger
    const invoice = {
      /*TODO
        1: 사용자가 주소입력 할 수 있도록 onChange설정하기
        2: 그래도, 처음에는 (회원가입)입력한 값으로 받기
        3: 주소 검색 API 붙이기
        4: UI 정리하기...ㅠㅠ
      */
      userEmail: userEmail,
      userCode: userCode,
      delivery: {
        to: user.Name,
        address: user.Address,
        phone: "010-999"
      },
      requestedGoods: selected.map(each => (
        { name : each.title,
          qutt: each.amount,
          sales: each.amount*each.price
        })),
      requestDesc: this.state.rqcontent,
      totalSales: selected.map(each => each.amount*each.price).reduce((a,b)=>a+b)
    }
    return(
      <div className="col-md-12">
        <label>우편번호</label>
        <div className="row address col-md-12">
          <Input type={'number'} placeholder={'우편번호'} className={'col-md-5 Added-Input'}/>
          <Input type={'submit'} value={'주소검색'} className={'col-md-3 Added-Input'}/>
        </div>
        <label>배송지</label>
        <Input type={'text'} value={user.Address} placeholder={'배송지'} className={'Added-Input'}/>
        <div className="row address col-md-12">
          <div>
            <label>수령인</label>
            <Input type={'text'} value={user.Name} placeholder={'받는이'} className={'col-md-5 Added-Input'}/>
          </div>
          <div>
            <label>연락처</label>
            <Input type={'text'} value={invoice.delivery.phone} placeholder={'전화번호'} className={'col-md-5 Added-Input'}/>
          </div>
        </div>

        <label>배송메모</label>
        <textarea
          rows="2" name='rqcontent' placeholder='배송 요청사항을 적어주세요.'
          value={this.state.rqcontent} onChange={this.handleChange}
          className="form-control"></textarea>
        <button
          className="btn btn-success col-md-3"
          onClick={() => requestInvoice(invoice)}>주문하기</button>
      </div>
    )
  }
}
export default Address
